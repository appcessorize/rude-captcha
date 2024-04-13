import "@/styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />{" "}
    </main>
  );
}
