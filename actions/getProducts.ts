import Product from '@/types';
import axios from 'axios';

// const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sliders?populate=*`;

export const getProducts = async (): Promise<Product[]> => {

    const response = await axios.get("http://localhost:1337/api/products?populate=*");
    const data = response.data.data;



    return data;

}

