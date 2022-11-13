import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import Sidebar from "../components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Sidebar>
      <Toaster />
      <Component {...pageProps} />
    </Sidebar>
  );
}
