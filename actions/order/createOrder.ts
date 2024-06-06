import axios from 'axios';



export const createOrder = async (data: any, jwt: any) => {

    try {
        const response = await axios.post("http://localhost:1337/api/orders", data, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });


        return response.data;
    } catch (error) {

        console.log("ERROR :", error);
        throw error;
    }

}

