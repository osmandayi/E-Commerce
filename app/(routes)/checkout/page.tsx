"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { productList } from "@/utils/getList";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ItemType {
  id: number;
  quantity: number | null;
  total: number;
  attributes: object | any;
}

interface OrderProps {
  user: string;
  jwt: string;
  order: any;
}

const CheckoutPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(10);
  const [tax, setTax] = useState(0.18);
  const [cartItems, setCartItems] = useState<ItemType[]>([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [paymentText, setPaymentText] = useState("Cash");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  let jwt: string | null = "";
  let user: string | null = "";
  let orders: string | null = "";
  let userId: string | null = "";

  try {
    jwt = localStorage.getItem("jwt");
    user = localStorage.getItem("user");
    orders = localStorage.getItem("orders");
    if (user) {
      const userObj = JSON.parse(user);
      userId = userObj.id;
    }

    if (!!orders) {
      localStorage.setItem("orders", JSON.stringify([]));
    }
  } catch (error) {
    console.error("ERROR :", error);
  }

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

  const calculateTotalAmount = (total: number, tax: number) => {
    const totalAmount = total + total * tax;

    return totalAmount.toFixed(2);
  };

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const onApprove = async () => {
    let arrayOrders = JSON.parse(orders ?? "[]");

    setLoading(true);

    // Kullanıcı kimliği (userID) oluştur
    const uuID = generateUUID();
    const orderDate = new Date().toISOString();
    const payload = {
      data: {
        paymentText,
        totalOrderAmount: calculateTotalAmount(subTotal + deliveryPrice, tax),
        username,
        email,
        phone,
        zip,
        address,
        OrderItemList: cartItems.map((item) => ({
          quantity: item.quantity,
          id: item.id,
          price: item.total,
          attributes: productList.find((product) => product.id === item.id),
        })),
        orderId: uuID,
        createdAt: orderDate,
      },
    };
    if (!!username && !!email && !!phone && !!zip && !!address) {
      toast({
        variant: "success",
        description: "Order Places Successfully.",
      });

      localStorage.setItem(
        "orders",
        JSON.stringify([
          ...arrayOrders,
          { user, jwt, orders: { data: payload.data } },
        ])
      );

      localStorage.setItem(
        "cart-storage",
        JSON.stringify({ state: { items: [] } })
      );

      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          router.push("/order-confirmation");
        }, 50);
      }, 1150);
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        description: "Please fill in all fields !",
      });
    }
  };

  return (
    <div>
      <h2 className="p-4 bg-green-700 text-2xl font-bold text-center text-white">
        CHECKOUT
      </h2>
      <div className="p-5 px-5 py-8 grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-6">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-6">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <Input
              placeholder="Zip"
              onChange={(e) => setZip(e.target.value)}
              value={zip}
            />
          </div>
          <div className="mt-6">
            <Textarea
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
        </div>
        <div className="col-span-1 mx-4 bg-slate-100 rounded-2xl mt-10 md:mt-0">
          <h2 className="p-3 font-bold text-center">
            Total Cart ({cartItems.length})
          </h2>
          <div className="p-4 flex flex-col">
            <h2 className="font-bold flex justify-between mb-2">
              Subtotal <span>${subTotal}</span>
            </h2>
            <h2 className="font-bold flex justify-between mb-2">
              Delivery <span>${deliveryPrice}</span>
            </h2>
            <h2 className="font-bold flex justify-between mb-2">
              Tax (%{tax * 100}){" "}
              <span>${((subTotal + deliveryPrice) * tax).toFixed(2)}</span>
            </h2>
            <h2 className="font-bold flex justify-between mb-2">
              Total :{" "}
              <span>
                ${calculateTotalAmount(subTotal + deliveryPrice, tax)}
              </span>
            </h2>
            <Button
              onClick={onApprove}
              className="mt-4"
              disabled={subTotal === 0}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Order Now"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
