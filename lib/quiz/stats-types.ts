export interface StatsResponse {
	count: number
	reliable: boolean
	percentiles: Record<string, number>
	typeShare: number | null
	offline?: boolean
}

export const MIN_SAMPLE = 30
