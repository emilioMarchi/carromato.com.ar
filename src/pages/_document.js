import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta name="color-scheme" content="light">

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
