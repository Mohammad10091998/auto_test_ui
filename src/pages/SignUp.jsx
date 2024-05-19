import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

function SignUp() {
  const { signUp, currentUser } = useAuth();

  const [errorAddingUser, seterrorAddingUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          seterrorAddingUser("");
          await signUp(values.name, values.email, values.password);
          navigate("/collections");
        } catch (err) {
          seterrorAddingUser(err.message);
          console.log("Error in sign up");
        }
        setLoading(false);
        action.resetForm();
      },
    });

  if (currentUser) {
    navigate("/home");
  }

  return (
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
        <h2 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          create new account. happy testing !!!
        </h2>
      </div>
      {errorAddingUser && (
        <p className="text-center font-semibold mt-2 text-rose-800 text-lg">
          {errorAddingUser}{" "}
        </p>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              your name please
            </label>
            <div className="mt-2">
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="name"
                name="name"
                type="name"
                className="p-2 mt-1 block w-full rounded-md border-gray-600 border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
              />
              {errors.name && touched.name ? (
                <p className="text-rose-800">{errors.name}</p>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              email address
            </label>
            <p className="text-red-600 font-semibold">
              Enter a valid email to ensure you can reset your password and keep
              your data safe.
            </p>
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                name="password"
                type="password"
                className="p-2 mt-1 block w-full rounded-md border-gray-600 border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
              />
              {errors.password && touched.password ? (
                <p className="text-rose-800">{errors.password}</p>
              ) : null}
            </div>
          </div>

          <div>
            {loading ? (
              <Spinner message="signing you up..." />
            ) : (
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                sign up
              </button>
            )}
          </div>
        </form>

        <Link
          to="/login"
          className="font-semibold leading-6 text-slate-600 hover:text-slate-500 flex justify-center my-4"
        >
          already have an account
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
