"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Category {
  id: number;
  name: string;
  url: string;
}

interface CategoriesProps {
  categoryList: Category[];
}

const TopCategory = ({ categoryList }: CategoriesProps) => {
  const pathname = usePathname();
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-8 mt-2">
        {categoryList?.map((category, i) => (
          <Link
            className={`flex flex-col items-center p-3 rounded-xl gap-2 group bg-green-100 cursor-pointer hover:bg-green-500 ${
              pathname.includes(category.name) && "bg-green-500"
            }`}
            href={`/product-category/${category.name}`}
            key={i}
          >
            <Image
              unoptimized={true}
              src={category?.url}
              alt=""
              width={30}
              height={30}
            />
            <h2
              className={`text-green-700 group-hover:text-white ${
                pathname.includes(category.name) && "text-white"
              }`}
            >
              {category?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategory;
