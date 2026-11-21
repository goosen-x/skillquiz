import { OG_SIZE, renderOg } from '@/lib/og/render'
import { getAllPosts, getPostBySlug } from '@/lib/api'

export const alt = 'Статья блога SkillQuiz'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
	return getAllPosts().map(p => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const post = getPostBySlug(slug)
	return renderOg({ eyebrow: 'Блог', title: post?.title ?? 'Блог SkillQuiz', footer: 'Статьи о психологии и самопознании' })
}
