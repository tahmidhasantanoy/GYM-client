"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import registerImage from "../../../public/Animation/register.svg";
import { useRegTrainerMutation } from "../redux/api/registerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = () => {
  const [regTrainer] = useRegTrainerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    const { fullname, email, password } = data;

    const trainerData = {
      fullname: fullname,
      email: email,
      password: password,
      role: "trainer",
    };

    console.log("trainerData", trainerData);

    try {
      const responseFromRegTrainerApi = await regTrainer(trainerData);

      console.log("responseFromRegTrainerApi", responseFromRegTrainerApi);

      if (responseFromRegTrainerApi.data.status === "success") {
        toast.success("Registration successful");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-White">
      <div className="flex flex-col md:flex-row justify-center items-center bg-white rounded-lg w-full max-w-4xl p-6">
        {/* Left Section - Image */}
        <div className="md:w-1/2 text-center mb-6 md:mb-0">
          <Image
            src={registerImage}
            alt="Register Illustration"
            className="mx-auto w-3/4 md:w-full max-w-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-6">
            Create an Account!
          </h2>
          <p className="text-gray-600 mt-2">
            Join us to access amazing features.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.fullname
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
                placeholder="Enter your full name"
                {...register("fullname", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Full name must be at least 3 characters long",
                  },
                })}
              />
              {errors.fullname && (
                <span className="text-red-500 text-sm">
                  {errors.fullname.message}
                </span>
              )}
            </div>

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
                    : "focus:ring-purple-500"
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
                    : "focus:ring-purple-500"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
            >
              Register
            </button>
          </form>
          <p className="text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
