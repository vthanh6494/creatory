import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={inter.className}>Welcome</h1>
        <p className={inter.className}>Show us what you got</p>
      </div>
    </main>
  );
}
