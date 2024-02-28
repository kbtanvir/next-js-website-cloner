/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  // experimental: {
  //   swcPlugins: [
  //     ["@preact-signals/safe-react/swc", {} /* plugin options here */],
  //   ],
  // },
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
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
      "cdn.builder.io",
    ],
  },

};

export default config;
