import axios from 'axios';


interface Image {
    url: string;
}

interface Product {
    id: number;
    attributes: {
        name: string;
        quantity: number;
        amount: number;
        images: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
        mrp: number;
    };
}

interface CartItemAttributes {
    quantity: number;
    amount: number;
    products: {
        data: Product[];
    };
}

interface CartItem {
    id: number;
    attributes: CartItemAttributes;
}

interface ApiResponse {
    data: CartItem[];
}


export const getToCart = async (userId: any, jwt: any) => {
    try {
        const response = await axios.get<ApiResponse>(`http://localhost:1337/api/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`, {
            headers: {
                Authorization: 'Bearer ' + jwt,
            }
        });


        const data = response.data.data
        const cartItemList = data.map((item, index) => ({
            name: item.attributes.products?.data[0].attributes.name,
            quantity: item.attributes.quantity,
            amount: item.attributes.amount,
            image: item.attributes.products?.data[0].attributes.images.data.attributes.url,
            actualPrice: item.attributes.products?.data[0].attributes.mrp,
            id: item.id,
            product: item.attributes.products?.data[0].id,
        }))


        return cartItemList;

    } catch (error) {

        console.log("ERROR :", error);
        throw error;
    }

}

