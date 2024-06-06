import axios from 'axios';

interface loginUserProps {
    email: string,
    password: string,
}

const loginUser = async ({ email, password }: loginUserProps) => {

    try {
        const response = await axios.post("http://localhost:1337/api/auth/local", { identifier: email, password: password });


        return response.data
    } catch (error) {
        console.log("ERROR :", error);
        throw error;
    }

}


export default loginUser
