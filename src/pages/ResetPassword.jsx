import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { passwordLessSchema } from "../schemas";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ResetPassword() {
  const [errorLoginUser, seterrorLoninUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mailto = queryParams.get("mailto");
  const { resetpassword } = useAuth();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { email: mailto ? mailto : "" },
      validationSchema: passwordLessSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          seterrorLoninUser("");
          await resetpassword(values.email);
          setIsEmailSent(true);
        } catch (err) {
          seterrorLoninUser(err.message);
          console.log("Error in sign up");
        }
        setLoading(false);
        action.resetForm();
      },
    });

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-slate-100">
        <div className="sm:mx-auto sm:w-full">
          <div className="flex mt-10 justify-center">
            <Link
              to="/"
              className="text-black text-6xl font-monospace font-bold hover:text-slate-700 rounded-md px-3 py-2 flex items-center"
            >
              aut
              <Cog6ToothIcon
                className="h-10 w-10 mt-5 animate-spin"
                aria-hidden="true"
              />
              Test
            </Link>
          </div>
          {!isEmailSent ? (
            <h2 className="mt-8 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
          ) : (
            <h2 className="mt-8 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-700">
              We have sent you an email, please reset your password via link !!!
            </h2>
          )}
        </div>
        {errorLoginUser && (
          <p className="text-center font-semibold mt-2 text-rose-800 text-lg">
            {errorLoginUser}{" "}
          </p>
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                email address
              </label>
              <div className="mt-2">
                <input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  name="email"
                  type="email"
                  className="p-2 mt-1 block w-full rounded-md border-gray-600 border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
                />
                {errors.email && touched.email ? (
                  <p className="text-rose-800">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div>
              {loading ? (
                <Spinner message="logging you in..." />
              ) : (
                <button
                  disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                >
                  send email
                </button>
              )}
            </div>
          </form>

          <Link
            to="/login"
            className="font-semibold leading-6 text-slate-600 hover:text-slate-500 flex justify-center my-4"
          >
            back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
