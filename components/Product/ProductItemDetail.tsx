"use client";
import React, { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { AddToCart } from "@/actions/cart/AddToCart";
import useCart from "@/hooks/useCart";
import { Product } from "./ProductList";

interface ProductItemDetailProps {
  product: Product;
}

const ProductItemDetail = ({ product }: ProductItemDetailProps) => {
  const [categoryLength] = useState(product.categories.length ?? 0);
  const [maxQuantity] = useState(product.maxQuantity ?? 5);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.mrp
  );

  let jwt: string | null = "";
  let user: string | null = "";
  let userId = "";

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

  const incrementQuantity = (maxQuantity: number) => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    } else {
      alert(
        `Sepete bu üründen en fazla ${maxQuantity} adet ekleyebilirsiniz !`
      );
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      alert("Sepette 1'den az ürün olamaz !");
    }
  };

  const cart = useCart();

  const addItem = useStore((state) => state.addItem);
  const fetchItems = useStore((state) => state.fetchItems);

  const [totalPrice, setTotalPrice] = useState(0);

  const onAddCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    // useCart hookunu kaldırdığımız için burdaki işlemleri de kaldırıyorum
    const productToAdd = {
      ...product,
      quantity,
      total: quantity * productTotalPrice,
    }; // ürünü sepete eklerken mevcut adet miktarını kullan
    // cart.addItem(productToAdd, quantity, quantity * productTotalPrice); // ürün miktarını da eklemeye geçir

    const existingCartData = localStorage.getItem("cart-storage");
    const existingCartItems = existingCartData
      ? JSON.parse(existingCartData).state.items
      : [];

    let productExists = false;
    const updatedCartItems = existingCartItems.map(
      (item: { id: number; quantity: number; total: number }) => {
        if (item.id === productToAdd.id) {
          productExists = true;
          return {
            ...item,
            quantity: item.quantity + productToAdd.quantity,
            total: item.total + productToAdd.total,
          };
        }
        return item;
      }
    );

    if (!productExists) {
      updatedCartItems.push(productToAdd);
    }

    // Güncellenmiş veriyi JSON formatına dönüştürerek localStorage'a yaz
    const stringJSON = JSON.stringify({ state: { items: updatedCartItems } });
    localStorage.setItem("cart-storage", stringJSON);

    // Toplam fiyatı güncelle
    const totalPrice = productToAdd.sellingPrice * quantity;
    setTotalPrice((prevTotalPrice) => prevTotalPrice + totalPrice);

    try {
      setLoading(true);

      // const item = {
      //   quantity: quantity,
      //   amount: Number((quantity * productTotalPrice).toFixed(2)),
      //   products: product.id,
      //   users_permissions_user: Number(userId),
      //   userId: Number(userId),
      // };

      // Assuming AddToCart expects the nested data structure
      // await AddToCart({ data: item }, jwt);

      // addItem(item); // Add the item to the store
      fetchItems(Number(userId), jwt);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
        <Image
          width={500}
          height={200}
          unoptimized={true}
          alt=""
          src={product.url}
        />
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="flex gap-3">
            {product.sellingPrice && (
              <>
                <h2 className="font-bold text-3xl">${product.sellingPrice}</h2>
                <h2 className="font-bold text-3xl line-through text-gray-400">
                  ${product.mrp}
                </h2>
              </>
            )}
          </div>

          <h2 className="text-2xl font-bold">
            Quantity ({product.itemQuantityType})
          </h2>
          <div className="flex flex-col items-baseline gap-4">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-slate-200 border flex gap-8 items-center px-5">
                <Button
                  className={`${
                    quantity === 1 && "cursor-not-allowed"
                  } text-2xl`}
                  style={{ pointerEvents: "initial" }}
                  disabled={quantity === 1}
                  onClick={decrementQuantity}
                >
                  -
                </Button>
                <h2>{quantity}</h2>
                <Button
                  className={`${
                    quantity >= maxQuantity && "cursor-not-allowed"
                  } text-2xl`}
                  style={{ pointerEvents: "initial" }}
                  disabled={quantity >= maxQuantity}
                  onClick={() => incrementQuantity(maxQuantity)}
                >
                  +
                </Button>
              </div>
              <h2>$ {(quantity * productTotalPrice).toFixed(2)}</h2>
            </div>
            <Button
              disabled={loading}
              onClick={onAddCart}
              className="flex gap-3 min-w-44"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <ShoppingBasket />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
          <h2>
            <span className="font-bold ml-2">Category : </span>
            {product.categories?.map((category: any, index: number) => (
              <>
                {category}
                {categoryLength - 1 !== index && ","}{" "}
              </>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProductItemDetail;
