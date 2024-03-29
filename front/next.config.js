/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack(config) {
        // https://react-svgr.com/docs/next/

        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg')
        )

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            }
        )

        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
}

module.exports = nextConfig
