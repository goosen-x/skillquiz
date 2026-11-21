import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import type { Post } from './types/post'

const postsDirectory = join(process.cwd(), '_posts')

export const DEFAULT_AUTHOR = { name: 'Редакция SkillQuiz', picture: '/favicon-192x192.png' }

function readPost(file: string): Post {
	const slug = file.replace(/\.md$/, '')
	const raw = fs.readFileSync(join(postsDirectory, file), 'utf8')
	const { data, content } = matter(raw)
	const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
	const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : data.updated
	return {
		slug,
		title: String(data.title),
		excerpt: String(data.excerpt ?? ''),
		date,
		updated: updated ? String(updated) : undefined,
		author: data.author ?? DEFAULT_AUTHOR,
		tests: Array.isArray(data.tests) ? data.tests.map(String) : [],
		content
	}
}

export function getAllPosts(): Post[] {
	if (!fs.existsSync(postsDirectory)) return []
	return fs
		.readdirSync(postsDirectory)
		.filter(f => f.endsWith('.md'))
		.map(readPost)
		.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | undefined {
	const file = `${slug}.md`
	if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(join(postsDirectory, file))) return undefined
	return readPost(file)
}
