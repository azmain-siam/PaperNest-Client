import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Form types
type LoginFormData = {
  email: string;
  password: string;
};

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>();

  // Register form
  const {
    register: registerSignup,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    // watch,
  } = useForm<RegisterFormData>();

  const [login, { error }] = useLoginMutation();
  const [register] = useRegisterMutation();
  // console.log("registerError", registerError);

  if (error) {
    console.log(error);
  }

  const onLoginSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);

      // post data to login API
      const { data: response } = await login(data).unwrap();
      const user = verifyToken(response.token);

      dispatch(setUser({ user, token: response.token }));
      toast.success("Login Successful!", { duration: 3000 });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      console.log("Register data:", data);
      // post data to registration API
      const res = await register(data);
      // console.log(res);

      if (res.error) {
        console.log("res.data.message");
      }
      if (res.data) {
        console.log("user registerd");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Auth Type Switcher */}
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 cursor-pointer p-4 text-center font-medium transition-colors ${
                isLogin
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 cursor-pointer p-4 text-center font-medium transition-colors ${
                !isLogin
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Container */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLoginSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      {...registerLogin("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-400"
                    />
                    {loginErrors.email && (
                      <p className="text-sm text-red-500">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      {...registerLogin("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-400"
                    />
                    {loginErrors.password && (
                      <p className="text-sm text-red-500">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    <a
                      href="#"
                      className="hover:text-gray-700 underline underline-offset-4"
                    >
                      Forgot your password?
                    </a>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegisterSubmit(onRegisterSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      {...registerSignup("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-400"
                    />
                    {registerErrors.name && (
                      <p className="text-sm text-red-500">
                        {registerErrors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      {...registerSignup("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-400"
                    />
                    {registerErrors.email && (
                      <p className="text-sm text-red-500">
                        {registerErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      {...registerSignup("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-400"
                    />
                    {registerErrors.password && (
                      <p className="text-sm text-red-500">
                        {registerErrors.password.message}
                      </p>
                    )}
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      {...registerSignup("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-400"
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}
                  </div> */}

                  <Button
                    type="submit"
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-900 hover:underline underline-offset-4 cursor-pointer"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
