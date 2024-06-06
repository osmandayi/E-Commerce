"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ItemType {
  id: number;
  quantity: number | null;
  total: number;
  attributes: object | any;
}

const OrderConfirmation = () => {
  const [cartItems, setCartItems] = useState<ItemType[]>([]);

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
    // İlk yüklemede localStorage'dan verileri al
    const loadCartItems = () => {
      let total = 0;
      try {
        const storedCartItems = JSON.parse(
          localStorage.getItem("cart-storage") || "{}"
        );

        if (Array.isArray(storedCartItems.state.items)) {
          setCartItems(storedCartItems.state.items);
          storedCartItems.state.items.forEach((element: any) => {
            total = total + element.total;
          });
        } else {
          // setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to parse cart items from localStorage:", error);
        // setCartItems([]);
      }
    };

    loadCartItems();

    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      loadCartItems();
    };

    window.addEventListener("storage", handleStorageChange);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      if (key === "cart-storage") {
        handleStorageChange();
      }
    };

    // Temizleme işlemi
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <div className="flex justify-center my-20">
      <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center">
        <CheckCircle2 className="h-24 w-24 text-green-600" />
        <h2 className="text-green text-3xl font-medium">Order Successfull</h2>
        <h2>Thank you so much for order</h2>
        <Link href={"/my-order"}>
          <Button className="mt-8">Track your order</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
