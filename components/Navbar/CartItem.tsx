import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  item: any;
  onDeleteItem: (id: any) => void;
}
const CartItem = ({ item, onDeleteItem }: CartItemProps) => {
  return (
    <div className="flex justify-between items-center p-2 mb-5">
      <div className="flex gap-6 items-center">
        <Image
          className="border p-2"
          width={90}
          height={90}
          unoptimized={true}
          alt=""
          src={item.url}
        />
        <div className="">
          <h2 className="font-bold">{item.name}</h2>
          <h2>Quantity : {item.quantity}</h2>
          <h2 className="text-lg font-bold">${item.total}</h2>
        </div>
      </div>
      <TrashIcon
        className="cursor-pointer"
        onClick={() => onDeleteItem(item.id)}
      />
    </div>
  );
};

export default CartItem;
