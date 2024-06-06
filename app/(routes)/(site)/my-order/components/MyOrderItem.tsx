import Image from "next/image";
import React from "react";

interface MyOrderItemProps {
  orderItem: any;
}

const MyOrderItem = ({ orderItem }: MyOrderItemProps) => {
  return (
    <div className="w-full xl:w-[60%]">
      <div className="grid grid-cols-5 mt-3 items-center">
        <Image
          className="bg-gray-100 p-5 rounded-md border"
          width={80}
          height={80}
          unoptimized={true}
          alt=""
          src={orderItem.attributes.url}
        />
        <div className="col-span-2">
          <h2>{orderItem.attributes.name}</h2>
        </div>
        <h2>Quantity = {orderItem.quantity},</h2>
        <h2>Item Price : ${orderItem.attributes.sellingPrice}</h2>
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export default MyOrderItem;
