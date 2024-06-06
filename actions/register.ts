import axios from 'axios';

interface registerUserProps {
    username: string,
    email: string,
    password: string,
}

const registerUser = async ({ username, email, password }: registerUserProps) => {

    try {
        const response = await axios.post("http://localhost:1337/api/auth/local/register", { username: username, email: email, password: password });


        return response.data
    } catch (error) {
        console.log("ERROR :", error);
        throw error;
    }

}


export default registerUser
