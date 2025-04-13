"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

function Login() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
      // Handle Google sign-in error (e.g., set an error state)
    } else {
      // Supabase will typically handle the redirect after successful OAuth
      console.log("Initiating Google sign-in...");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Login Picture (Left Background) */}
      <div className="relative w-1/2 md:w-2/3">
        <Image
          src="/login.png"
          alt="login"
          fill
          className="object-contain object-left"
        />
      </div>

      {/* Right Side Content (Logo and Login Form) */}
      <div className="w-1/2 md:w-1/3 flex flex-col items-center justify-center p-8">
        {/* Logo Section (Top within the right side) */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="logo"
            width={600}
            height={600}
            className="w-5 h-5"
          />
          <h2 className="text-2xl font-bold mt-4 text-center">
            Welcome to Monarch!
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Please log in to continue
          </p>
        </div>

        {/* Supabase Sign in with Google */}
        <Button
          className="w-full bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 font-semibold py-2 px-4 rounded flex items-center justify-center mt-2"
          onClick={signInWithGoogle}
        >
          <Image
            src="/google_logo.svg" // Replace with the actual path to your Google logo SVG file
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
export default Login;
