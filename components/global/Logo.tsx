/**
 * Знак SkillQuiz: карточка вопроса с тремя вариантами ответа, средний выбран.
 * Те же фигуры лежат в public/icon.svg, OG-картинках и PDF.
 */
export function Logo({ size = 32, className = '' }: { size?: number; className?: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 64 64'
			className={className}
			aria-hidden='true'
			data-corner='round'
		>
			<rect width='64' height='64' rx='16' fill='#6D4AFF' />
			<rect x='14' y='14' width='36' height='8' rx='4' fill='#fff' opacity='0.55' />
			<rect x='14' y='28' width='36' height='8' rx='4' fill='#fff' />
			<circle cx='46' cy='32' r='6' fill='#FF7A3D' stroke='#fff' strokeWidth='2.5' />
			<rect x='14' y='42' width='26' height='8' rx='4' fill='#fff' opacity='0.55' />
		</svg>
	)
}
