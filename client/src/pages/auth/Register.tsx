import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../services/authApi";

import {registerSchema,type RegisterFormData,} from "../../features/auth/auth.schema";
import { setSession } from "../../utils/authSession";

const Register = () => {
  const navigate = useNavigate();

  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const {register,handleSubmit,formState: { errors },} = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).unwrap();
      setSession();
      navigate("/dashboard");
    } catch(error) {
      console.error("Register Faild",error)
    }
  };

  const apiError = error && "data" in error && typeof error.data === "object" 
  && error.data !== null && "message" in error.data ? String(error.data.message) : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold">
              Create Account
            </h1>

            <p className="mt-2 text-base-content/60">
              Start creating short URLs.
            </p>
          </div>

          {apiError && (
            <div className="alert alert-error mb-4">
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input type="text" placeholder="Your name"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name")}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Password
                </span>
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password")}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link link-primary"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Register;