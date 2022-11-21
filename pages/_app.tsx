import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shorty</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Shorty" />
        <meta
          name="description"
          content="Simple url shortener, shorten your link in less than 1 minute. No email required and especially, its FREE."
        />
        <meta name="copyright" content="Jiseeeh" />
        <meta
          name="keywords"
          content="Shorty, url shortener, free url shortener,link shortener"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shawtee.vercel.app" />
        <meta property="og:title" content="Shorty" />
        <meta
          property="og:description"
          content="Simple url shortener, shorten your link in less than 1 minute. No email required and especially, its FREE."
        />
        <meta
          property="og:image"
          content="http://res.cloudinary.com/dpu5ywrox/image/upload/v1669041449/uuqotxyzqjh0i73wxsvd.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shawtee.vercel.app" />
        <meta property="twitter:title" content="Shorty" />
        <meta
          property="twitter:description"
          content="Simple url shortener, shorten your link in less than 1 minute. No email required and especially, its FREE."
        />
        <meta
          property="twitter:image"
          content="http://res.cloudinary.com/dpu5ywrox/image/upload/v1669041449/uuqotxyzqjh0i73wxsvd.png"
        />
      </Head>
      <Sidebar>
        <Toaster />
        <Component {...pageProps} />
      </Sidebar>
    </>
  );
}
