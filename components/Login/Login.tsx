"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setAccessToken, setCurrentUser } from "@/utils/storage";
import { Context as AppContext } from "@/context/appContext";
import BaseService from "@/services/api/baseApi";
import { message } from "antd";
import Logged from "@/components/Logged/Logged";
import { useAuth } from "@/context/authContext";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";

const Login = ({ onLogin, onLogout }) => {
  const { baseUrl, isLogged: isLoggedContext } = useContext(AppContext);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(isLoggedIn);
  useEffect(() => {
    setIsLogged(isLoggedContext);
  }, [isLoggedContext]);

  const onLoginClick = useCallback(async (data) => {
    const url = `${baseUrl}users/login`;
    const api = new BaseService(url);
    const { data: result } = await api.post(JSON.stringify(data));
    setAccessToken(result.token);
    setCurrentUser(data.email);
    onLogin();
    message.success("Login successful");
    router.refresh();
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    onLoginClick(values);
  };

  const onShareAMovie = () => {
    router.push("/share");
  };

  return (
    <>
      {isLogged && <Logged onLogout={onLogout} onShareAMovie={onShareAMovie} />}
      {!isLogged && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, isValid }) => (
            <Form className={styles.loginForm}>
              <div>
                <Field
                  placeholder="email"
                  type="text"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  className={styles.error}
                  name="email"
                  component="div"
                />
              </div>
              <div>
                <Field
                  placeholder="password"
                  type="password"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  className={styles.error}
                  name="password"
                  component="div"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={styles.button}
              >
                Login / Register
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Login;
