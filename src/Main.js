import { useState , useEffect } from "react";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

function Main(props)
{
    const [data, setData]=useState(Array(3).fill(false));
    const [disp, setDisp] =useState("");
    const [cookies, setCookie,removeCookie]=useCookies(['enquiryUser']);
    const navigate=useNavigate();

    useEffect(()=>{
        if(cookies.enquiryUser=== undefined)
        {
                navigate("/");
        }
        else
        {
            fetch(`http://localhost:2000/enquiry/accdata`, {
                headers:{
                    "Content-Type": "application/json",
                    "authorization": cookies.enquiryUser
                },    
                method: 'GET' ,
                    mode: 'cors',
                    credentials:"same-origin",
                }).then(function(res){
                    if(res.status===200)
                    {
                        res.json().then(function(res){
                            console.log(res);
                        })
                    }
                })
        }
    }
    );

    function handlelogout(props)
    {
        removeCookie("enquiryUser");
        navigate('/');
    }
    if(cookies.enquiryUser=== undefined)
    {
            navigate("/");
    }
    return (
        <div>
            <div>
            <button>edit account details</button>
                <button onClick={handlelogout}>log out</button>
                <button>deactivate</button>
            </div>
            <div>
                <button>Cab-pool dashboard</button>
                <button>lost/found enquiry dashboard</button>
            </div>
            <h1>account is here</h1>
        </div>
        
    )
}

export default Main;