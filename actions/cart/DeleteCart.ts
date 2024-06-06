import axios from 'axios';



export const deleteCart = async (id: any, jwt: any) => {

    try {
        const response = await axios.delete(`http://localhost:1337/api/user-carts/${id}`, {
            headers: {
                Authorization: 'Bearer ' + jwt,
            }
        });


        return response.data;

    } catch (error) {

        console.log("ERROR :", error);
        throw error;
    }

}

