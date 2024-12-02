"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import loginImage from "../../../public/Animation/Reset password-pana.svg";
import { useLoginUserMutation } from "../redux/api/loginApi";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const { email, password } = data;

    const userInfo = {
      email: email,
      password: password,
    };

    try {
      const responseFromLoginUserApi = await loginUser(userInfo);
      if (responseFromLoginUserApi?.data?.success == true) {
        router.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg p-8 w-full max-w-[1300px]">
        {/* Left Section - Image */}
        <div className="md:w-1/2 text-center mb-6 md:mb-0">
          <Image
            src={loginImage}
            alt="Login Illustration"
            className="mx-auto w-3/4 md:w-full max-w-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-6">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mt-2">
            Sign in to continue accessing your account.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-1/2 text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-gray-600 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/registration"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
