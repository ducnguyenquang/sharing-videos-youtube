import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./shareMovieInputForm.module.css";

interface FormValues {
  videoUrl: string;
}

const shareMovieInputForm = ({ onSharedMovie }) => {
  const initialValues: FormValues = {
    videoUrl: "",
  };

  const validationSchema = Yup.object().shape({
    videoUrl: Yup.string().required("url is required"),
  });

  // const handleUrlChange = (e) => {
  //   setMovieUrl(e.target.value);
  // };

  const handleSubmit = (values: FormValues) => {
    // e.preventDefault();
    // Here you can construct the URL with the movie details as query parameters.
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
        <div className="share-movie-form">
          <h2 className="form-header">Share a Youtube movie</h2>
          <Form>
            <div className="form-group">
              <label className="url" htmlFor="videoUrl">
                Youtube URL:
              </label>
              <Field type="text" id="videoUrl" name="videoUrl" className="input" />
              <ErrorMessage name="videoUrl" component="div" />
            </div>
            <button
              className="shareBtn"
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

export default shareMovieInputForm;
