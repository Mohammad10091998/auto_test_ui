import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import Spinner from "../ui/Spinner";
import { useState } from "react";

const initialValues = {
  email: '',
  password: '',
}
function Login() {
  const { signIn,currentUser } = useAuth();

  const [errorLoginUser, seterrorLoninUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues:initialValues,
    validationSchema:loginSchema,
    onSubmit: async (values,action) => {
    try {
      setLoading(true);
      seterrorLoninUser("");
      await signIn(values.email, values.password);
      navigate('/collections');
    } catch (err) {
      seterrorLoninUser(err.message);
      console.log("Error in sign up");
    }
    setLoading(false);
    action.resetForm();
    }
  })
  
  if(currentUser){
    navigate('/home')
  }
  const forgotPassword = () => {
    navigate(`/resetpassword?mailto=${values.email}`);
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
            <Cog6ToothIcon className="h-10 w-10 mt-5 animate-spin" aria-hidden="true" />
            Test
          </Link>
        </div>
        <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          login please. happy testing !!!
        </h2>
      </div>
      {errorLoginUser && <p className="text-center font-semibold mt-2 text-rose-800 text-lg">{errorLoginUser} </p>}
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
                onBlur = {handleBlur}
                id = 'email'
                name="email"
                type="email"
                className="p-2 mt-1 block w-full rounded-md border-gray-600 border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
              />
              {errors.email && touched.email ? (<p className="text-rose-800">{errors.email}</p>) : null}
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
              <button
              className="text-sm font-medium leading-6 text-blue-700 hover:text-blue-500"
               onClick={forgotPassword}
               >
                forgot password
              </button>
            </div>
            <div className="mt-2">
              <input
                value={values.password}
                onChange={handleChange}
                onBlur = {handleBlur}
                id="password"
                name="password"
                type="password"
                className="p-2 mt-1 block w-full rounded-md border-gray-600 border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
              />
              {errors.password && touched.password ? (<p className="text-rose-800">{errors.password}</p>) : null}
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
                log in
              </button>
            )}
          </div>
        </form>

        <Link
          to="/signup"
          className="font-semibold leading-6 text-slate-600 hover:text-slate-500 flex justify-center my-4"
        >
          create new account
        </Link>
      </div>
    </div>
  );
}

export default Login;
