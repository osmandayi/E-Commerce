import Category from '@/types';
import axios from 'axios';

// const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sliders?populate=*`;

export const getCategories = async (): Promise<Category[]> => {

    const response = await axios.get("http://localhost:1337/api/categories?sort[0]=name:asc&populate=*");
    const data = response.data.data;



    return data;

}

