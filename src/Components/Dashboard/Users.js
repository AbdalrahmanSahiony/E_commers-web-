import axios from "axios"
import { useEffect } from "react"
import { baseURL, USERS } from "../../Api/Api"
import Cookie from 'cookie-universal'
import Logout from "../../Pages/Auth/Logout";

export default function Users(){

    const cookie = Cookie();

    useEffect(() => {
        axios.get(`${baseURL}/${USERS}`,{headers: {
         Authorization:'Bearer ' + cookie.get('e-commerc')
        }})
    },[])
    return(

        <div>
        Users
        <Logout/>
        </div>
    )
}