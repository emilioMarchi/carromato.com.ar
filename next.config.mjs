/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cualestuhuella.cl",
        pathname: "/**",
      },
      // podés sumar otros dominios acá con más objetos similares
    ],
  },
};

export default nextConfig;
