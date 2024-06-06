"use client";
import React from "react";
import ProductList from "@/components/Product/ProductList";
import TopCategory from "../_components/TopCategory";
import { categoryList, productList } from "@/utils/getList";
import { useSearch } from "@/context/context";

interface CategoryNamePageProps {
  params: {
    categoryName: string;
  };
}

const CategoryNamePage = ({ params }: CategoryNamePageProps) => {
  // const params = useParams(); // alternatif kullanım

  const { searchParams } = useSearch();

  const { categoryName } = params;

  const myFilterCategories = productList.filter((product) =>
    product.categories.includes(categoryName)
  );

  const filteredProducts = myFilterCategories.filter((product) =>
    product.name.toLowerCase().includes(searchParams.toLowerCase())
  );

  return (
    <div>
      <h2 className="p-4 bg-green-600 text-white font-bold text-center text-4xl mb-5">
        {categoryName}
      </h2>
      <div className="p-8">
        <TopCategory categoryList={categoryList} />
        <ProductList productList={filteredProducts} />
      </div>
    </div>
  );
};

export default CategoryNamePage;
