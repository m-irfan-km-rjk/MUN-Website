/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 75 is the default; 90 is used by the team cards (TeamSection).
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
