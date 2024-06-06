import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Product {
  id: number;
  name: string;
  description: string;
  mrp: string;
  sellingPrice: string;
  itemQuantityType: string;
  slug: string;
  images: string;
  categories: string;
  quantity?: number;
  total?: number;
}

interface CartStore {
  items: Product[];
  addItem: (data: Product, quantity?: number, total?: number) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

const useCart = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product, quantity: number = 1, total?: number) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === data.id
        );

        if (existingItemIndex !== -1) {
          set({
            items: currentItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: quantity, total: total }
                : item
            ),
          });
        } else {
          set((state) => ({
            items: [...state.items, { ...data, quantity, total: total }],
          }));
        }
      },
      removeItem: (id: number) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
