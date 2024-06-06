"use client";
import { useCategoriesStore } from "@/hooks/useCategoriesStore";
import { LayoutGrid } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { categoryList } from "@/utils/getList";
import { usePathname } from "next/navigation";

const CategoryButton = () => {
  const pathname = usePathname();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
            <LayoutGrid className="h-5 w-5" /> Category
          </h2>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categoryList?.map((category, i) => (
            <Link key={i} href={`/product-category/${category.name}`}>
              <DropdownMenuItem
                className="flex gap-3 items-center cursor-pointer"
                disabled={pathname.includes(category.name)}
              >
                <Image
                  unoptimized={true}
                  alt=""
                  src={category?.url}
                  width={30}
                  height={30}
                />
                <h5>{category.name}</h5>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryButton;
