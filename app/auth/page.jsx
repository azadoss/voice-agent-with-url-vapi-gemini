import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Login() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="w-[50px]"
        />
      </div>

      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex-shrink-0">
          <Image
            src="/login.png"
            alt="login"
            width={100}
            height={100}
            className="w-[300px]"
          />
        </div>
        
        <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Welcome to Mascot</h2>
        <p className="text-sm text-gray-500">
          Please enter your details to login
        </p>

        <Button type="submit">Login</Button>
      </div>
      </div>

      
    </div>
  );
}

export default Login;
