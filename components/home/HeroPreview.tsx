/** Макет экрана вопроса на первом экране главной: показывает, как выглядит тест */
export function HeroPreview() {
	const options = ['Спокойно жду, у человека свои дела', 'Начинаю волноваться и перечитываю переписку', 'Пишу ещё раз через пару минут', 'Мне всё равно']
	return (
		<div className='hero-rise relative mx-auto hidden w-full max-w-md [animation-delay:120ms] sm:block' aria-hidden='true'>
			<div className='absolute -inset-4 -z-10 rotate-3 rounded-[2rem] bg-primary/10' />
			<div className='rounded-3xl border border-border/70 bg-card p-6 shadow-xl shadow-primary/10'>
				<div className='flex items-center justify-between text-xs font-semibold text-muted-foreground'>
					<span>Стиль привязанности</span>
					<span>7 из 15</span>
				</div>
				<div className='mt-3 h-1.5 overflow-hidden rounded-full bg-muted'>
					<div className='h-full w-[46%] rounded-full bg-primary' />
				</div>
				<p className='mt-6 font-heading text-xl leading-snug font-bold'>
					Близкий человек не отвечает на сообщение уже три часа. Что вы делаете?
				</p>
				<div className='mt-5 space-y-2.5'>
					{options.map((o, i) => (
						<div
							key={o}
							className={
								i === 0
									? 'rounded-xl border-2 border-primary bg-primary/5 px-4 py-3 text-sm font-medium'
									: 'rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground'
							}
						>
							{o}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
