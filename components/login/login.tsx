import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCurrentUser } from "@/utils/storage";

interface FormValues {
  email: string;
  password: string;
}

const Login = ({ onLogin }) => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const [isLogged, setIsLogged] = useState(false)
  
  const currentUser = useMemo(() => {
    return getCurrentUser();
  }, [isLogged]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values: FormValues) => {
    onLogin(values);
  };

  useEffect(() => {
    if(currentUser) setIsLogged(true)
  }, [currentUser, isLogged])
  
  return isLogged ? <>{currentUser}</> : 
    (<Formik
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
    </Formik>)}


export default Login;
