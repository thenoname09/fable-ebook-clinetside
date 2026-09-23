
import { Suspense } from "react";
import LoginForm from "./LoginForm";
export const metadata = {
  title: "Log In — Fable",
  description: "Log in to your Fable account to access your digital ebook library and personal collection.",
  robots: {
    index: false,
    follow: true,
  },
};
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}