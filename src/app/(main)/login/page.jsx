"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { BsGoogle } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries());

    try {
      // Better-Auth email sign-in engine execution
      const { data, error: authError } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (data) {
        router.refresh();
        // Redirects users back to core system tracking or landing page
        router.push("/"); 
      }

      if (authError) {
        setError(authError.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#080808] px-4 py-12 relative overflow-hidden">
      {/* Background radial accent halos - Identical matching design tokens */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <Card className="w-full max-w-md bg-[#0f0f0f]/80 border border-zinc-800/60 backdrop-blur-md shadow-2xl z-10 p-6">
        <Card.Content className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-400">
              Sign in to{" "}
              <span className="bg-gradient-to-r from-[#c084fc] to-[#818cf8] bg-clip-text text-transparent font-semibold">
                fable
              </span>{" "}
              to continue your journey
            </p>
          </div>

          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {error && (
              <div className="p-3 text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                {error}
              </div>
            )}

            {/* Email Input */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1.5"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-zinc-300 font-medium text-xs">
                Email Address
              </Label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-zinc-500 text-sm z-20" />
                <Input
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 focus:border-[#c084fc] rounded-xl text-white text-sm placeholder:text-zinc-600 transition-colors focus:outline-none"
                />
              </div>
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Password Input */}
            <TextField
              isRequired
              name="password"
              type="password"
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300 font-medium text-xs">
                  Password
                </Label>
                {/* Placeholder link context for advanced workflows later */}
                <Link href="#" className="text-xs text-[#c084fc]/80 hover:text-[#c084fc] hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 text-zinc-500 text-sm z-20" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 focus:border-[#c084fc] rounded-xl text-white text-sm placeholder:text-zinc-600 transition-colors focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full mt-2 font-semibold text-white bg-gradient-to-r from-[#c084fc] to-[#818cf8] shadow-lg shadow-purple-500/10 hover:opacity-95 transition-all"
            >
              Sign In
            </Button>
          </Form>

          <div className="flex items-center gap-4 my-1">
            <Separator className="flex-1 bg-zinc-800/60" />
            <span className="text-xs text-zinc-600 uppercase font-medium">
              or
            </span>
            <Separator className="flex-1 bg-zinc-800/60" />
          </div>

          <Button
            onClick={handleGoogleLogIn}
            className="w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/60 text-zinc-300 text-sm font-medium transition-all"
          >
            <BsGoogle className="mr-1 text-sm text-zinc-400" /> Sign in with Google
          </Button>

          <p className="text-center text-xs text-zinc-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#c084fc] hover:underline font-medium transition-all"
            >
              Sign Up
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}