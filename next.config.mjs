/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.istockphoto.com", "wikipedia.org"], // Add the domains of your image sources here
  },
};

export default nextConfig;
