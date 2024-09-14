import axios from 'axios';
import Cookie from 'cookie-universal';
import { baseURL, LOGOUT } from '../../Api/Api';

export default function Logout(){
    const cookie = Cookie();

    function handleLogout (){
        try{

    const res = axios.get(`http://127.0.0.1:8000/api/logout`, {
        headers: {
            Authorization : "Bearer " + cookie.get("e-commerce")
        },
    });
    console.log(res)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
        
        <button onClick={handleLogout}>Logout</button>
        </div>
    )
}