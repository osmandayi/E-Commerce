import axios from 'axios';

interface CartItemAttributes {
    id: number,
    totalOrderAmount: any;
    paymentText: any;
    OrderItemList: any;
    createdAt: any;
}

interface CartItem {
    id: number;
    attributes: CartItemAttributes;
}

interface ApiResponse {
    data: CartItem[];
}


export const getOrders = async (userId: any, jwt: any) => {
    try {
        const response = await axios.get<ApiResponse>(`http://localhost:1337/api/orders?filters[userId][$eq]=${userId}&populate[OrderItemList][populate][product][populate][images]=url`, {
            headers: {
                Authorization: 'Bearer ' + jwt,
            }
        });


        const data = response.data.data
        const orderList = data.map((item, index) => ({
            id: item.id,
            totalOrderAmount: item.attributes.totalOrderAmount,
            paymentText: item.attributes.paymentText,
            orderItemList: item.attributes.OrderItemList,
            createdAt: item.attributes.createdAt,
        }))


        return orderList;

    } catch (error) {

        console.log("ERROR :", error);
        throw error;
    }

}

