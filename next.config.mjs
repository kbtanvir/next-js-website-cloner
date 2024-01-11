import asd from "@next/bundle-analyzer"

await import("./src/env/server.mjs")

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withBundleAnalyzer(config)
}

const withBundleAnalyzer = asd({
  enabled: process.env.ANALYZE === "true",
})

export default defineNextConfig({
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "cloudflare-ipfs.com",
      "loremflickr.com",
      "avatars.githubusercontent.com",
      "picsum.photos",
    ],
  },
})
