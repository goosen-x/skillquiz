'use client'

import { ADS_ENABLED, YANDEX_AD_BLOCK_ID } from '@/lib/site'
import { useYandexAd } from './useYandexAd'

const CONTAINER_ID = `yandex_rtb_${YANDEX_AD_BLOCK_ID}`

/**
 * Рекламный блок РСЯ в потоке страницы. По умолчанию выключен
 * (NEXT_PUBLIC_ADS=on включает) — тогда компонент вообще ничего не рендерит.
 */
export function AdSection() {
	if (!ADS_ENABLED) return null
	return <AdSlot />
}

function AdSlot() {
	useYandexAd(YANDEX_AD_BLOCK_ID, CONTAINER_ID)
	return (
		<div className='my-6 w-full min-h-[300px]' data-no-print>
			<div id={CONTAINER_ID} className='mx-auto w-full' />
		</div>
	)
}
