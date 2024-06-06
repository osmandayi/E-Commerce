"use client";
import registerUser from "@/actions/register";
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

const CreateUserPage = () => {
  const {
    email,
    username,
    password,
    loader,
    setUsername,
    setEmail,
    setPassword,
    setLoader,
  } = useAuthStore();

  const router = useRouter();
  const { toast } = useToast();

  const onSignup = () => {
    setLoader(true);
    registerUser({ username, email, password })
      .then(
        (response) => {
          startSession(response.user, response.jwt);
          toast({
            description: "Account Created Succcessfull :)",
            variant: "success",
          });
          setLoader(false);
          router.push("/");
        },
        (error) => {
          setLoader(false);
          toast({
            description: error?.response?.data?.error?.message,
            variant: "destructive",
          });
        }
      )
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 border border-gray-300">
        <Image alt="" src={"/logo.png"} width={200} height={200} />
        <h2 className="font-bold text-3xl">Create to Account</h2>
        <h2 className="text-gray-400">Enter your email or password</h2>
        <div className="w-full flex flex-col gap-5 mt-8">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Button disabled={!(email && password)} onClick={onSignup}>
            {loader ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create Account "
            )}
          </Button>
          <p>
            Already have a account? <br />
            <Link className="text-green-600" href={"sign-in"}>
              Click here to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
