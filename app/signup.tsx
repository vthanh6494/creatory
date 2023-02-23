import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import "./globals.css";

import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import { Loading, NotiComponent } from "./components/notification";
import { POST, setAuth } from "./helper";
import { CODE_FAILED, CODE_SUCCESS, PAGE_SIGNUP } from "./const";

const inter = Inter({ subsets: ["latin"] });

export const SignupComponent = () => {
  const [res, setRes] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const [seePass, setSeePass] = useState(false);
  const [textPass, setTextPass] = useState("show");
  const [errorsFe, setErrorsFe] = useState<any>();
  const [clickedSubmitBtn, setClickedSubmitBtn] = useState<boolean>(false);

  const handleValidate = (values: any, isInSubmit?: boolean) => {
    if (!clickedSubmitBtn && !isInSubmit) return;
    const errors: any = {};
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPass = /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,}$/i;
    const regexVietnamPhone =
      /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})$/i;
    if (!values.email) {
      errors.email = "Required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 2 || values.name.length > 1000) {
      errors.name =
        "Name should have at least 2 characters and no more than 1000";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (!regexPass.test(values.password)) {
      errors.password = "Invalid password";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (!regexVietnamPhone.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }
    setErrorsFe(errors);
    return errors;
  };

  useEffect(() => {
    if (seePass) {
      setTextPass("hide");
    } else {
      setTextPass("show");
    }
  }, [seePass]);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.container}>
          <div>
            <h1 className={[styles.h1, inter.className].join(" ")}>
              Create an account in just a few seconds
            </h1>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                phone: "",
              }}
              onSubmit={async (values) => {
                setClickedSubmitBtn(true);
                const errs = handleValidate(values, true);
                if (Object.values(errs).length || loading) return;
                setLoading(true);
                try {
                  const res = await POST({
                    url: "/api/create",
                    payload: {
                      name: values.name,
                      email: values.email,
                      password: values.password,
                      phone: values.phone,
                    },
                  });
                  if (res.success) {
                    setAuth();
                    setRes({
                      detail: "Your account has been created successfully.",
                      code: CODE_SUCCESS,
                    });
                  } else {
                    setRes({
                      detail: "Something went wrong. Please try again!",
                      code: CODE_FAILED,
                    });
                  }
                } catch (err: any) {
                  console.log(err);
                } finally {
                  setLoading(false);
                }
              }}
              validate={handleValidate}
            >
              <Form className={s.form}>
                <NotiComponent message={res} fromPage={PAGE_SIGNUP} />
                <div
                  className={[
                    s.inputWrap,
                    errorsFe?.email ? s.errorsFe : "",
                  ].join(" ")}
                >
                  <label htmlFor="email" className={inter.className}>
                    Email
                  </label>

                  <Field
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                  />
                  {errorsFe && errorsFe.email && (
                    <div className={[s.errFeMgs, inter.className].join(" ")}>
                      {errorsFe.email}
                    </div>
                  )}
                </div>
                <div
                  className={[
                    s.inputWrap,
                    errorsFe?.name ? s.errorsFe : "",
                  ].join(" ")}
                >
                  <label htmlFor="name" className={inter.className}>
                    Name
                  </label>

                  <Field id="name" name="name" placeholder="Name" max />
                  {errorsFe && errorsFe.name && (
                    <div className={[s.errFeMgs, inter.className].join(" ")}>
                      {errorsFe.name}
                    </div>
                  )}
                </div>

                <div
                  className={[
                    s.inputWrap,
                    errorsFe?.password ? s.errorsFe : "",
                  ].join(" ")}
                >
                  <label htmlFor="password" className={inter.className}>
                    Password
                  </label>

                  <Field
                    id="password"
                    name="password"
                    type={seePass ? "text" : "password"}
                    placeholder="Password"
                  />
                  <p className={[s.notePassword, inter.className].join(" ")}>
                    Password should have at least a number, a special character,
                    and be more than 8 characters
                  </p>
                  {errorsFe && errorsFe.password && (
                    <div className={[s.errFeMgs, inter.className].join(" ")}>
                      {errorsFe.password}
                    </div>
                  )}

                  <div
                    className={[s.textPass, inter.className].join(" ")}
                    onClick={() => setSeePass((seePass) => !seePass)}
                  >
                    {textPass}
                  </div>
                </div>
                <div
                  className={[
                    s.inputWrap,
                    errorsFe?.password_confirm ? s.errorsFe : "",
                  ].join(" ")}
                >
                  <label htmlFor="phone" className={inter.className}>
                    Phone
                  </label>
                  <Field id="phone" name="phone" placeholder="Phone" />
                  {errorsFe && errorsFe.phone && (
                    <div className={[s.errFeMgs, inter.className].join(" ")}>
                      {errorsFe.phone}
                    </div>
                  )}
                </div>
                <div className={s.btnSubmit}>
                  <button type="submit" className={s.primarybtn}>
                    {loading ? <Loading /> : <p>Create</p>}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
};
