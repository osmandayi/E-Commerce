import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ProductItemDetail from "./ProductItemDetail";
import { Product } from "./ProductList";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="p-2 md:p-4 lg:p-6 flex flex-col items-center justify-center gap-4 border rounded-xl hover:shadow-lg cursor-pointer transition-all">
      <Image
        width={500}
        height={200}
        unoptimized={true}
        alt=""
        src={product.url}
      />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <div className="flex gap-3">
        {product.sellingPrice && (
          <>
            <h2>${product.sellingPrice}</h2>
            <h2 className="line-through text-gray-400">${product.mrp}</h2>
          </>
        )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="bg-green-600 text-white">
            Add To Cart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
