"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import { Inter } from "@next/font/google";
import { POST, setAuth } from "./helper";
import { Loading, NotiComponent } from "./components/notification";
import {
  CODE_FAILED,
  CREATE_ACCOUNT_LINK,
  PAGE_LOGIN,
  VIEW_LINK,
} from "./const";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const LoginComponent = ({
  redirectLink,
}: {
  redirectLink?: string | undefined;
}) => {
  const [message, setMessage] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [seePass, setSeePass] = useState(false);
  const [textPass, setTextPass] = useState("show");
  const router = useRouter();

  useEffect(() => {
    if (seePass) {
      setTextPass("hide");
    } else {
      setTextPass("show");
    }
  }, [seePass]);

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const data = await POST({
              url: "/api/auth",
              payload: { username: values.username, password: values.password },
            });
            if (data.auth) {
              setAuth();
              if (redirectLink) router.push(redirectLink);
              // window.location.href = VIEW_LINK;
            }
            if (data.errorDetails) {
              setMessage({ detail: data.errorDetails, code: CODE_FAILED });
            }
          } catch (err: any) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Form className={s.form}>
          <NotiComponent message={message} fromPage={PAGE_LOGIN} />
          <div className={s.inputWrap}>
            <Field
              id="username"
              name="username"
              placeholder="User name"
              type="username"
            />
          </div>

          <div className={s.inputWrap}>
            <Field
              id="password"
              name="password"
              type={seePass ? "text" : "password"}
              placeholder="Password"
            />
            <div
              className={[s.textPass, inter.className].join(" ")}
              onClick={() => setSeePass((seePass) => !seePass)}
            >
              {textPass}
            </div>
          </div>
          <div className={s.btnSubmit}>
            <Link
              href={CREATE_ACCOUNT_LINK}
              className={[inter.className, s.button, s.secondarybtn].join(" ")}
            >
              Create an account
            </Link>
            <button type="submit" className={s.primarybtn}>
              {loading ? <Loading /> : <p>Login</p>}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
