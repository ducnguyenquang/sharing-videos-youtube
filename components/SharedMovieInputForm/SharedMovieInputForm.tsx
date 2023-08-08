import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SharedMovieInputForm.module.css";

interface FormValues {
  videoUrl: string;
}

const SharedMovieInputForm = ({ onSharedMovie }) => {
  const initialValues: FormValues = {
    videoUrl: "",
  };

  const validationSchema = Yup.object().shape({
    videoUrl: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("url is required"),
  });

  const handleSubmit = (values: FormValues) => {
    const sharedMovieURL = encodeURIComponent(values.videoUrl);
    console.log("onSharedMovie", onSharedMovie);
    onSharedMovie(sharedMovieURL);
  };

  return (
    <div className={styles.centerBox}>
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
            <div className={styles.formHeader}>Share a Youtube movie</div>
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label className="url" htmlFor="videoUrl">
                  Youtube URL:
                </label>
                <div className={styles.videoUrlGroup}>
                  <Field
                    type="text"
                    id="videoUrl"
                    name="videoUrl"
                    className={styles.videoUrl}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="videoUrl"
                    component="div"
                  />
                </div>
              </div>
              <div className={styles.groupButton}>
                <button
                  className={styles.shareButton}
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Share
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SharedMovieInputForm;
