import { useState , useEffect } from "react";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import pp from "./images/profilepic.jpg";
import './main.css';

function Main(props)
{
    const [img, setImg]=useState();
    const[ accdata,setAccdata]=useState();
    const [dispName, setDispName] =useState("");
    const [cookies, setCookie,removeCookie]=useCookies(['enquiryUser']);
    const navigate=useNavigate();

    var data;
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
                            data=res;
                            setDispName(res.firstname+" "+res.lastname+" "+res.roll);
                            if(res.dp===null)
                            {
                                setImg(pp);
                            }
                            else
                            {
                                setImg(res.dp);
                            }
                            if(res.type!=="admin")
                            {
                                document.getElementById("admin").disabled=true;
                                document.getElementById("admin").style="visibility:hidden;";
                            }
                            else
                            {
                                document.getElementById("admin").disabled=false;
                            }
                        })
                    }
                    else 
                    {
                        removeCookie("enquiryUser");
                        navigate("/");
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
        <div className="mainpage">
            <div className="topbar">
            <img src={img} className="profilepic" alt="profilepic" />
            <h1 className="displayname">{dispName}</h1>
            <button className = "accedit">Edit</button>
                <button className="logout" onClick={handlelogout}>log out</button>
                <button className="deactivate">deactivate</button>
                <button id="admin" onClick={handlelogout}>admin</button>
            </div>
            <div className="midbar">
                <button className="cabpool">Cab-pool dashboard</button>
                <button className="lostfound">lost/found enquiry dashboard</button>
            </div>
            <div className="lowbar"></div>
        </div>
        
    )
}

export default Main;