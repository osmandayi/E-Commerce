"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { getOrders } from "@/actions/order/getOrder";
import MyOrderItem from "./components/MyOrderItem";
import { getProducts } from "@/actions/getProducts";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OrderItemList {
  id: number;
  quantity: number;
  price: number;
}

interface DataDetail {
  address: string;
  createdAt: string;
  email: string;
  orderId: string;
  totalOrderAmount: string;
  paymentText: string;
  OrderItemList: OrderItemList[];
}

interface OrderItemDetail {
  data: DataDetail;
}

interface OrderItem {
  jwt: string;
  orders: OrderItemDetail;
  user: string;
}

const MyOrderPage = () => {
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const [isOpen, setIsOpen] = useState<number[]>([]);

  const router = useRouter();

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
  } catch (error) {
    console.error("ERROR :", error);
  }
  // useEffect(() => {
  //   if (!jwt) {
  //     router.replace("/");
  //   }
  //   getMyOrder();
  // }, []);

  // const getMyOrder = async () => {
  //   const getOrderList = await getOrders(userId, jwt);
  //   const getProductList = await getProducts();

  //   setOrderList(
  //     getOrderList?.map((order) => ({
  //       ...order,
  //       orderItemList: order.orderItemList.map((orderItem: any) => ({
  //         ...orderItem,
  //         attributes: getProductList.find(
  //           (product) => product.id === orderItem.id
  //         )?.attributes,
  //       })),
  //     }))
  //   );
  // };

  useEffect(() => {
    if (!jwt && !user) {
      router.replace("/");
    }
    const ordersFiltered = JSON.parse(orders ?? "[]");
    setOrderList(
      ordersFiltered.filter(
        (order: any) => order.user === user && order.jwt === jwt
      )
    );
  }, []);

  console.log("ORDER LIST :", orderList);

  return (
    <div>
      <h2 className="p-3 bg-green-700 font-bold text-4xl text-center text-white">
        My Order
      </h2>
      <div className="py-8 mx-7">
        <h2 className="text-3xl font-bold">Order History</h2>
        <div className="mt-10">
          {orderList.map((item, index) => (
            <Collapsible
              key={index}
              open={isOpen.includes(index)}
              onOpenChange={() => {
                if (isOpen.includes(index)) {
                  setIsOpen((prevValue) =>
                    prevValue.filter((prev) => prev !== index)
                  );
                } else {
                  setIsOpen([...isOpen, index]);
                }
              }}
            >
              <CollapsibleTrigger className="w-full xl:w-[60%]">
                <div className="border p-2 bg-slate-100 flex gap-24 items-center">
                  <h2>
                    <span className="font-bold mr-2">Order Date: </span>{" "}
                    {moment(item?.orders?.data?.createdAt).format(
                      "h:mm:ss A, MMMM Do YYYY"
                    )}{" "}
                    <span className="text-zinc-400">
                      (
                      {moment(item?.orders?.data?.createdAt)
                        .startOf("minute")
                        .fromNow()}
                      )
                    </span>
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount: </span> $
                    {item?.orders?.data?.totalOrderAmount}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status: </span>
                    Pending
                  </h2>
                  <div className="ml-auto items-center flex">
                    {isOpen.includes(index) ? (
                      <ChevronUp width={25} height={25} />
                    ) : (
                      <ChevronDown width={25} height={25} />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orders?.data?.OrderItemList &&
                  item.orders?.data?.OrderItemList.map((order, index) => (
                    <MyOrderItem key={index} orderItem={order} />
                  ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
