import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add the Material Icons font link here */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Rude captcha uses AI to check if you're human"
        />

        <meta property="og:url" content="https://rude-capt.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RudeCaptcha" />
        <meta
          property="og:description"
          content="Rude captcha uses AI to check if you're human"
        />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/documents/c78f12d3-f1b5-4eac-bae1-33e810ae7296.jpg?token=WvKV0EOy_XZJgJBjIAn9AtoG1eeo1G825ztSD2BJz-g&height=675&width=1200&expires=33249190299"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="rude-capt.vercel.app" />
        <meta property="twitter:url" content="https://rude-capt.vercel.app" />
        <meta name="twitter:title" content="RudeCaptcha" />
        <meta
          name="twitter:description"
          content="Rude captcha uses AI to check if you're human"
        />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/documents/c78f12d3-f1b5-4eac-bae1-33e810ae7296.jpg?token=WvKV0EOy_XZJgJBjIAn9AtoG1eeo1G825ztSD2BJz-g&height=675&width=1200&expires=33249190299"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
