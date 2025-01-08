/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{
      hostname: 'github-profile-summary-cards.vercel.app',
      protocol: 'https',
    }],
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
}

export default nextConfig;
