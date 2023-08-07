import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./sharedMovieInputForm.module.css";

interface FormValues {
  videoUrl: string;
}

const SharedMovieInputForm = ({ onSharedMovie }) => {
  const initialValues: FormValues = {
    videoUrl: "",
  };

  const validationSchema = Yup.object().shape({
    videoUrl: Yup.string().required("url is required"),
  });

  const handleSubmit = (values: FormValues) => {
    const sharedMovieURL = encodeURIComponent(values.videoUrl);
    console.log("onSharedMovie", onSharedMovie);
    onSharedMovie(sharedMovieURL);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true}
    >
      {({ isSubmitting, isValid }) => (
        <div className={styles.shareMovieForm}>
          <h2 className={styles.formHeader}>Share a Youtube movie</h2>
          <Form>
            <div className={styles.formGroup}>
              <label className="url" htmlFor="videoUrl">
                Youtube URL:
              </label>
              <Field type="text" id="videoUrl" name="videoUrl" />
              <ErrorMessage name="videoUrl" component="div" />
            </div>
            <button
              // className={styles.shareBtn}
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Share
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SharedMovieInputForm;
