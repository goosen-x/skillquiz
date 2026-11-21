export type Post = {
	slug: string
	title: string
	/** Описание для листинга и meta description */
	excerpt: string
	/** YYYY-MM-DD */
	date: string
	/** Дата обновления, если статью правили */
	updated?: string
	author: { name: string; picture: string }
	/** Слаги тестов, которые упоминаются в статье: показываются после неё */
	tests: string[]
	/** Тексты в markdown */
	content: string
}
