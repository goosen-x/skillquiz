import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import styles from '@/components/blog/markdown.module.css'

/** Обёртка текстовых страниц: крошки, H1, типографика статьи */
export function TextPage({
	title,
	lead,
	path,
	children
}: {
	title: string
	lead?: string
	path: string
	children: ReactNode
}) {
	return (
		<main>
			<Breadcrumbs
				items={[
					{ name: 'Главная', url: '/' },
					{ name: title, url: path }
				]}
			/>
			<article className='container max-w-3xl pb-12'>
				<h1 className='text-4xl leading-tight sm:text-5xl'>{title}</h1>
				{lead && <p className='mt-4 text-lg text-muted-foreground'>{lead}</p>}
				<div className={`${styles.markdown} mt-8`}>{children}</div>
			</article>
		</main>
	)
}
