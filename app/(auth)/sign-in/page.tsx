"use client";
import loginUser from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/hooks/useAuthStore";
import { startSession } from "@/lib/session";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInPage = () => {
  const { email, password, loader, setEmail, setPassword, setLoader } =
    useAuthStore();

  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      router.push("/");

      localStorage.setItem("jwt", password);
      localStorage.setItem("user", email);
    }, 1500);
    // loginUser({ email, password })
    //   .then((resp) => {
    //     startSession(resp.user, resp.jwt);

    //     toast({
    //       description: "Account Login Succcessfull :)",
    //       variant: "success",
    //     });
    //     setLoader(false);
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     setLoader(false);
    //     toast({
    //       description: error?.response?.data?.error?.message,
    //       variant: "destructive",
    //     });
    //   })
    //   .finally(() => {
    //     setLoader(false);
    //   });
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 border border-gray-300">
        <Image alt="" src={"/logo.png"} width={200} height={200} />
        <h2 className="font-bold text-3xl">Sign in to Account</h2>
        <h2 className="text-gray-400">Enter your email or password</h2>
        <div className="w-full flex flex-col gap-5 mt-8">
          <Input
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={!(email && password)} onClick={handleSignIn}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign in "}
          </Button>
          <p>
            Don&apos;t have a account? <br />
            <Link className="text-green-600" href={"create-user"}>
              Click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
