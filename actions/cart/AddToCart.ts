import axios from 'axios';



export const AddToCart = async (data: any, jwt: any) => {

    try {
        const response = await axios.post("http://localhost:1337/api/user-carts", data, {
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

