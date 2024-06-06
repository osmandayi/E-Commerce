"use client";
import Categories from "@/components/Categories";
import ProductList from "@/components/Product/ProductList";
import Slider from "@/components/Slider";
import Image from "next/image";
import { sliderList, categoryList, productList } from "@/utils/getList";
import { useSearch } from "@/context/context";

export default function Home() {
  const { searchParams } = useSearch();

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchParams.toLowerCase())
  );

  return (
    <div className="px-3">
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <ProductList productList={filteredProducts} />
      <Image
        src={"/delivery.png"}
        width={1000}
        height={300}
        alt=""
        className="w-full object-contain mt-10"
      />
    </div>
  );
}
