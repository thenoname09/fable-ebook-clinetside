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
  ListBox,
  Select,
  Separator,
  TextField,
} from "@heroui/react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiBookOpen,
  FiEdit3,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { BsGoogle } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";
// Import your configured Better-Auth client instance

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("reader");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      
      const { data, error: authError } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role, // Passes the select input value to your database
      });
      console.log(data);
      if (data) {
        router.refresh();
        // Smart routing branch configuration matching user intent
        router.push(user.role === "writer" ? "/dashboard" : "/browse");
      }

      if (authError) {
        setError(authError.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected database connection error occurred.");
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
    <div className="min-h-[85vh] flex items-center justify-center bg-[#080808] px-4 py-12 pt-28 relative overflow-hidden">
      {/* Background radial accent halos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <Card className="w-full max-w-md bg-[#0f0f0f]/80 border border-zinc-800/60 backdrop-blur-md shadow-2xl z-10 p-6">
        
        <Card.Content className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Create your account
            </h1>
            <p className="text-sm text-zinc-400">
              Join{" "}
              <span className="bg-gradient-to-r from-[#c084fc] to-[#818cf8] bg-clip-text text-transparent font-semibold">
                fable
              </span>{" "}
              to start your journey
            </p>
          </div>

          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {error && (
              <div className="p-3 text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                {error}
              </div>
            )}

            {/* Name Input */}
            <TextField isRequired name="name" className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-xs">
                Full Name
              </Label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3.5 text-zinc-500 text-sm z-20" />
                <Input
                  placeholder="Your Name"
                  className="w-full pl-10 pr-3 py-2 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 focus:border-[#c084fc] rounded-xl text-white text-sm placeholder:text-zinc-600 transition-colors focus:outline-none"
                />
              </div>
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

          
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
              className="flex flex-col gap-1.5"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-zinc-300 font-medium text-xs">
                Password
              </Label>
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
              <Description className="text-zinc-500 text-[11px] px-1">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-red-400 text-xs mt-0.5" />
            </TextField>

            {/* 🟢 FIXED: Modern HeroUI v3 Select Compound Dropdown Interface */}
            <Select
              name="role"
              isRequired
              placeholder="Select a role"
              value={role}
              onChange={setRole}
              className="w-full"
            >
              <Label className="text-zinc-300 font-medium text-xs mb-1.5 block">
                Account Role
              </Label>
              <Select.Trigger className="w-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-white rounded-xl px-3 py-2 flex justify-between items-center text-sm focus:outline-none focus:border-[#c084fc] transition-all">
                <Select.Value />
                <Select.Indicator className="text-zinc-500" />
              </Select.Trigger>
              <Select.Popover className="bg-[#0f0f0f] border border-zinc-800 text-white rounded-xl p-1 shadow-2xl">
                <ListBox className="bg-transparent text-white">
                  <ListBox.Item
                    id="reader"
                    textValue="Reader"
                    className="flex items-center gap-2 p-2 hover:bg-zinc-900 data-[selected=true]:text-[#c084fc] rounded-lg cursor-pointer text-zinc-300 text-sm"
                  >
                    <FiBookOpen className="inline mr-2 text-purple-400 text-base" />{" "}
                    Reader — Explore & read books
                  </ListBox.Item>
                  <ListBox.Item
                    id="writer"
                    textValue="Writer"
                    className="flex items-center gap-2 p-2 hover:bg-zinc-900 data-[selected=true]:text-[#818cf8] rounded-lg cursor-pointer text-zinc-300 text-sm"
                  >
                    <FiEdit3 className="inline mr-2 text-indigo-400 text-base" />{" "}
                    Writer — Write & publish books
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full mt-2 font-semibold text-white bg-gradient-to-r from-[#c084fc] to-[#818cf8] shadow-lg shadow-purple-500/10 hover:opacity-95 transition-all"
            >
              Sign Up
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
            <BsGoogle className="mr-1 text-sm text-zinc-400" /> Sign up with
            Google
          </Button>

          <p className="text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#c084fc] hover:underline font-medium transition-all"
            >
              Sign In
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
