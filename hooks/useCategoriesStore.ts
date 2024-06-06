import Category from '@/types';
import { create } from 'zustand';
import axios from 'axios'


export type CategoryState = {
    categories: Category[];
    fetchCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoryState>((set) => ({
    categories: [],
    fetchCategories: async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/categories?sort[0]=name:asc&populate=*`)
            set({ categories: response.data.data.map((category: any) => category.attributes) });

        } catch (error) {
            console.log("ERROR :", error);
        }
    }
}))