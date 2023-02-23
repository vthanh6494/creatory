import { Inter } from "@next/font/google";
import { VIEW_LINK } from "./const";
import { LoginComponent } from "./login";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.container}>
          <div>
            <h1 className={[styles.h1, inter.className].join(" ")}>
              Welcome to my assignment
            </h1>
            <LoginComponent redirectLink={VIEW_LINK} />
          </div>
        </div>
      </div>
    </main>
  );
}
