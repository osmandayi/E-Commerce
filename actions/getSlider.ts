import Slider from '@/types';
import axios from 'axios';

// const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sliders?populate=*`;

export const getSlider = async (): Promise<Slider[]> => {

    const response = await axios.get("http://localhost:1337/api/sliders?populate=*");
    const data = response.data.data;



    return data;

}

