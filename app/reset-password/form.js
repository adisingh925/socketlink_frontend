"use client";

import React, { useState } from "react";
import { auth } from "../components/firebase"; // Adjust the path as necessary
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from "../components/toast";

function ResetPassword() {
  const [email, setEmail] = useState({ email: "" });
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [severity, setSeverity] = useState("");

  const onChange = (event) => {
    setEmail({ ...email, [event.target.name]: event.target.value });
  };

  const handleResetPasswordClicked = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email.email).then(() => {
      setSeverity("success");
      setSnackbarText("Password reset link sent to your email!");
      setSnackbarState(true);
    }).catch((error) => {
      setSeverity("error");
      setSnackbarText(error.message);
      setSnackbarState(true);
    });
  };

  return (
    <>
      <section className="bg-blue dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Don't fret! Just type in your email and we will send you a link to
              reset your password!
            </p>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleResetPasswordClicked}
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Send Password Reset Link
              </button>
            </form>
          </div>
        </div>
      </section>

      <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
    </>
  );
}

export default ResetPassword;
