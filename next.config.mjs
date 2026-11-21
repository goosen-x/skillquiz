/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	poweredByHeader: false,
	agentRules: false,
	async redirects() {
		return [
			// Адреса старого PsyTest, которые могли успеть попасть в закладки
			{ source: '/tests/creativity-test', destination: '/tests/creativity', permanent: true },
			{ source: '/tests/risk-tolerance', destination: '/tests/risk-profile', permanent: true },
			{ source: '/tests/dopamine-detox-need', destination: '/tests/dopamine-detox', permanent: true },
			{ source: '/tests/digital-wellness-persona', destination: '/tests/digital-habits', permanent: true }
		]
	},
	async headers() {
		return [
			{
				source: '/tests/:slug/result/:code',
				headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }]
			},
			{
				source: '/fonts/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
			}
		]
	}
}

export default nextConfig
