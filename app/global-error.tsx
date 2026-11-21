'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error('Critical error:', error)
	}, [error])

	return (
		<html lang='ru'>
			<body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
				<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
					<div style={{ maxWidth: 480 }}>
						<h1 style={{ fontSize: 32, margin: 0 }}>Сайт не загрузился</h1>
						<p style={{ color: '#555', lineHeight: 1.5 }}>
							Произошла ошибка. Обновите страницу через минуту. Если тест был в процессе, ответы сохранились в браузере.
						</p>
						{error.digest && <p style={{ color: '#888', fontSize: 13 }}>Код ошибки: {error.digest}</p>}
						<div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
							<button
								onClick={reset}
								style={{ background: '#6D4AFF', color: '#fff', border: 0, borderRadius: 12, padding: '12px 20px', fontSize: 15, cursor: 'pointer' }}
							>
								Попробовать снова
							</button>
							{/* eslint-disable-next-line @next/next/no-html-link-for-pages -- глобальная ошибка: роутер мог не загрузиться */}
							<a href='/' style={{ borderRadius: 12, padding: '12px 20px', fontSize: 15, border: '1px solid #ddd', color: '#111', textDecoration: 'none' }}>
								На главную
							</a>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
