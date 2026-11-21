import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const OG_SIZE = { width: 1200, height: 630 }

async function font(name: string): Promise<ArrayBuffer> {
	const buf = await readFile(join(process.cwd(), 'public/fonts', name))
	return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

// Без явных шрифтов satori полез бы за ними в интернет на каждый запрос
const fontsPromise = Promise.all([font('Inter-Regular.ttf'), font('Inter-SemiBold.ttf'), font('Onest-Bold.ttf')])

export interface OgContent {
	/** Строка над заголовком: «ТЕСТ · 5 минут» */
	eyebrow: string
	title: string
	subtitle?: string
	/** Крупная плашка справа: «72%», «18 из 20» */
	badge?: string | null
	/** Подпись в футере */
	footer?: string
}

function Mark() {
	return (
		<svg width='56' height='56' viewBox='0 0 64 64'>
			<rect width='64' height='64' rx='16' fill='#6D4AFF' />
			<rect x='14' y='14' width='36' height='8' rx='4' fill='#fff' opacity='0.55' />
			<rect x='14' y='28' width='36' height='8' rx='4' fill='#fff' />
			<circle cx='46' cy='32' r='6' fill='#FF7A3D' stroke='#fff' strokeWidth='2.5' />
			<rect x='14' y='42' width='26' height='8' rx='4' fill='#fff' opacity='0.55' />
		</svg>
	)
}

export async function renderOg(content: OgContent): Promise<ImageResponse> {
	const [regular, semibold, heading] = await fontsPromise
	const titleSize = content.title.length > 60 ? 52 : content.title.length > 36 ? 62 : 76
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					background: 'linear-gradient(135deg, #f7f4ff 0%, #ffffff 55%, #fff3ec 100%)',
					padding: '56px 64px',
					fontFamily: 'Inter',
					color: '#14111f'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<Mark />
					<div style={{ display: 'flex', fontFamily: 'Onest', fontSize: 34 }}>
						<span>Skill</span>
						<span style={{ color: '#6D4AFF' }}>Quiz</span>
					</div>
				</div>
				<div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 40 }}>
					<div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
						<div
							style={{
								display: 'flex',
								fontSize: 24,
								fontWeight: 600,
								letterSpacing: 2,
								color: '#6D4AFF',
								textTransform: 'uppercase'
							}}
						>
							{content.eyebrow}
						</div>
						<div
							style={{
								display: 'flex',
								marginTop: 18,
								fontFamily: 'Onest',
								fontSize: titleSize,
								lineHeight: 1.08
							}}
						>
							{content.title}
						</div>
						{content.subtitle ? (
							<div style={{ display: 'flex', marginTop: 22, fontSize: 28, lineHeight: 1.35, color: '#4b4760' }}>
								{content.subtitle}
							</div>
						) : null}
					</div>
					{content.badge ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								minWidth: 260,
								height: 260,
								padding: '0 28px',
								borderRadius: 48,
								background: '#6D4AFF',
								color: '#fff',
								fontFamily: 'Onest',
								fontSize: content.badge.length > 6 ? 64 : 92
							}}
						>
							{content.badge}
						</div>
					) : null}
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#6b6780' }}>
					<span>{content.footer ?? 'Психологические тесты с подробным разбором'}</span>
					<span>skillquiz.ru</span>
				</div>
			</div>
		),
		{
			...OG_SIZE,
			fonts: [
				{ name: 'Inter', data: regular, weight: 400, style: 'normal' },
				{ name: 'Inter', data: semibold, weight: 600, style: 'normal' },
				{ name: 'Onest', data: heading, weight: 700, style: 'normal' }
			]
		}
	)
}
