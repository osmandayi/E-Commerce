// store.ts
import { getToCart } from "@/actions/cart/getCart";
import create from 'zustand';

interface Item {
    id?: number;
    quantity: number;
    amount: number;
    products: number;
    userId: number | null;
}

interface StoreState {
    items: Item[];
    fetchItems: (userId: number, jwt: string | null) => Promise<void>;
    addItem: (item: Item) => void;
    deleteItem: (itemId: number) => void;
}

export const useStore = create<StoreState>((set) => ({
    items: [],

    fetchItems: async (userId, jwt) => {
        const data = await getToCart(userId, jwt);
        const items: Item[] = data.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            amount: item.amount,
            products: item.product,
            userId: userId,
        }));
        set({ items });
    },

    addItem: (item) => set((state) => ({ items: [...state.items, item] })),

    deleteItem: (itemId) => set((state) => ({
        items: state.items.filter((item) => item.id !== itemId),
    })),
}));
