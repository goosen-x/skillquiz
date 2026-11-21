import type { Metadata } from 'next'
import { Mail, Send } from 'lucide-react'
import { TextPage } from '@/components/layout/TextPage'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Контакты',
	description: 'Как связаться с командой SkillQuiz через Telegram. Пишите про ошибки в тестах, идеи новых тестов и сотрудничество.',
	alternates: { canonical: '/contact' }
}

export default function ContactPage() {
	return (
		<TextPage title='Контакты' lead='Пишите про ошибки в тестах, идеи новых тестов и сотрудничество.' path='/contact'>
			<div className='not-prose grid gap-4 sm:grid-cols-2'>
				{SITE.email && (
					<a
						href={`mailto:${SITE.email}`}
						className='flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40'
						style={{ textDecoration: 'none' }}
					>
						<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
							<Mail className='h-5 w-5' />
						</span>
						<span>
							<span className='block font-semibold text-foreground'>Почта</span>
							<span className='block text-base text-primary'>{SITE.email}</span>
						</span>
					</a>
				)}
				<a
					href={SITE.telegram}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40'
					style={{ textDecoration: 'none' }}
				>
					<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
						<Send className='h-5 w-5' />
					</span>
					<span>
						<span className='block font-semibold text-foreground'>Telegram</span>
						<span className='block text-base text-primary'>@gooselabs</span>
					</span>
				</a>
			</div>
			<h2>Если нашли ошибку в тесте</h2>
			<p>
				Пришлите ссылку на тест или на свой результат (её можно скопировать на экране результата) и опишите, что не так.
				Ссылка на результат содержит только ваши ответы, без имени и других данных, так что по ней мы сразу увидим ту же
				картину, что и вы.
			</p>
			<h2>Если вам сейчас плохо</h2>
			<p>
				Мы не консультируем по личным вопросам и не можем оказать психологическую помощь по почте. Если вам тяжело
				справляться, обратитесь к психологу или врачу. В экстренной ситуации звоните 112.
			</p>
		</TextPage>
	)
}
