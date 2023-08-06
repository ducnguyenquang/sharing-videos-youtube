"use client";
import React, { useCallback, useContext, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getCurrentUser,
  setAccessToken,
  setCurrentUser,
} from "@/utils/storage";
import { Context as AppContext } from "@/context/appContext";
import BaseService from "services/api/baseApi";
import { message } from "antd";
import Logged from "../logged/logged";

interface FormValues {
  email: string;
  password: string;
}

const Login = ({ onLogged }) => {
  const { baseUrl, isLogged } = useContext(AppContext);
  const currentUser = useMemo(() => getCurrentUser() as string, [isLogged]);

  const onLogin = useCallback(async (data) => {
    const url = `${baseUrl}users/login`;
    const api = new BaseService(url);
    const { data: result } = await api.post(JSON.stringify(data));
    setAccessToken(result.token);
    setCurrentUser(data.email);
    onLogged();
    message.success("Login successful");
  }, []);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values: FormValues) => {
    onLogin(values);
  };

  return currentUser ? (
    <Logged />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <div>
            <Field placeholder="email" type="text" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <Field
              placeholder="password"
              type="password"
              id="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting || !isValid}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
