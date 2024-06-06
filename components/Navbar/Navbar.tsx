"use client";
import {
  Circle,
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CategoryButton from "./CategoryButton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cart from "./Cart";
import { useSearch } from "@/context/context";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { searchParams, setSearchParams } = useSearch();

  let jwt: string | null = "";
  let user: string | null = "";
  let userId: string | null = "";

  try {
    jwt = localStorage.getItem("jwt");
    user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      userId = userObj.id;
    }
  } catch (error) {
    console.error("ERROR :", error);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    setIsLoggedIn(!!jwt);
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            alt=""
            src={"/logo.png"}
            width={130}
            height={90}
            className="cursor-pointer"
          />
        </Link>
        <CategoryButton />
        <div className="md:flex hidden gap-2 items-center border rounded-full p-2 px-5">
          <Search className="h-5 w-5" />
          <input
            className="outline-none"
            placeholder="Search"
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        {isLoggedIn ? (
          <Cart jwt={jwt} userId={userId} />
        ) : (
          <Link href={"/sign-in"}>
            <h2 className="flex gap-2 items-center relative text-lg">
              <ShoppingCart className="h-5 w-5" />
              <span className="bg-green-600 left-3 bottom-3 flex justify-center align-middle text-sm size-5 text-white absolute px-2 rounded-full">
                0
              </span>
            </h2>
          </Link>
        )}

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="bg-green-200 p-2 rounded-full h-12 w-12 text-green-900" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={"/my-order"}>
                <DropdownMenuItem>My Order</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button className="bg-green-600">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
