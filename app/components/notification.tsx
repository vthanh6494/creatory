import Link from "next/link";
import s from "./notification.module.css";
import { Inter } from "@next/font/google";
import { CODE_FAILED, CODE_SUCCESS, PAGE_SIGNUP, VIEW_LINK } from "../const";

interface Props {
  message: { code: string; detail: string };
  fromPage: string;
}

const inter = Inter({ subsets: ["latin"] });

export const NotiComponent = ({ message, fromPage }: Props) => {
  const generateContent = () => {
    if (message.code === CODE_FAILED) {
      return (
        <div className={[s.notiWraper, s.notiErrors].join(" ")}>
          <p className={inter.className}>{message.detail}</p>
        </div>
      );
    }
    if (fromPage === PAGE_SIGNUP && message.code === CODE_SUCCESS) {
      return (
        <div className={[s.notiWraper, s.notiSuccess].join(" ")}>
          <p className={inter.className}>{message.detail}</p>
          <Link href="/">
            <p className={[inter.className, s.link].join(" ")}>
              Go to home page
            </p>
          </Link>
        </div>
      );
    }
  };
  return <div className={s.notiWraper}>{generateContent()}</div>;
};

export const Loading = () => <div className={s.loading} />;
