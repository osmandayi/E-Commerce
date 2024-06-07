// Cart.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import { deleteCart } from "@/actions/cart/DeleteCart";

interface CartProps {
  userId: string | null;
  jwt: string | null;
}
interface ItemType {
  id: number;
  quantity: number | null;
  total: number;
  attributes: object | any;
}

const Cart = ({ jwt, userId }: CartProps) => {
  const fetchItems = useStore((state) => state.fetchItems);
  const deleteItem = useStore((state) => state.deleteItem);
  const items = useStore((state) => state.items);
  const router = useRouter();
  const [cartItems, setCartItems] = useState<ItemType[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [localItems, setLocalItems] = useState(
    localStorage.getItem("cart-storage") ?? "{}"
  );

  useEffect(() => {
    let total = 0;
    cartItems?.forEach((item) => (total += item.total));
    setSubTotal(total);
  }, [cartItems]);

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

  const onDeleteItem = (id: number) => {
    // deleteCart(id, jwt);
    deleteItem(id);
    setCartItems(cartItems.filter((cart: any) => cart.id !== id));

    // Güncellenmiş cart items listesi
    const updatedCartItems = cartItems.filter((item: any) => item.id !== id);

    // Güncellenmiş veriyi JSON formatına dönüştür
    const updatedData = { state: { items: updatedCartItems } };
    const stringJSON = JSON.stringify(updatedData);

    // localStorage'a güncellenmiş veriyi yaz
    localStorage.setItem("cart-storage", stringJSON);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <h2 className="flex gap-2 items-center relative text-lg">
          <ShoppingCart className="h-5 w-5" />
          <span className="bg-green-600 left-3 bottom-3 flex justify-center align-middle text-sm size-5 text-white absolute px-2 rounded-full">
            {cartItems.length}
          </span>
        </h2>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-3xl">My Cart</SheetTitle>
          <SheetDescription>
            {cartItems?.map((item: ItemType, index: number) => (
              <CartItem
                key={index}
                item={item}
                onDeleteItem={() => onDeleteItem(item.id)}
              />
            ))}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter></SheetFooter>
        <SheetClose asChild>
          <div className="absolute w-[90%] bottom-6 flex-col">
            <h2 className="text-lg font-bold flex justify-between">
              Subtotal
              <span>${subTotal}</span>
            </h2>
            <div className="h-5"></div>
            <Button
              type="submit"
              disabled={cartItems.length === 0}
              onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
            >
              Checkout
            </Button>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
