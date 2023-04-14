import { useState , useEffect } from "react";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import pp from "./images/profilepic.jpg";
import LowbarSelect from "./LowbarSelect.js";
import './main.css';

 function Main(props)
{
    const [img, setImg]=useState();
    const[ lowbar,setLowbar]=useState(0);
    const [dispName, setDispName] =useState("");
    const [cookies, setCookie,removeCookie]=useCookies(['enquiryUser']);
    const [id, setId]=useState();
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
                            setDispName(res.firstname+" "+res.lastname+" "+res.roll);
                            setId(res._id);
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
    function handleEdit()
    {
        setLowbar(1);
    }
    function handleCabpool()
    {
        setLowbar(2);
    }
    function handleLostfound()
    {
        setLowbar(3);
    }
    function handleAdmin()
    {
        setLowbar(4);
    }
    function handleDeactivate()
    {
        setLowbar(5);
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
            <button className = "accedit" onClick={handleEdit}>Edit</button>
                <button className="logout" onClick={handlelogout}>log out</button>
                <button className="deactivate" onClick={handleDeactivate}>deactivate  </button>
                <button id="admin" onClick={handleAdmin}>admin</button>
            </div>
            <div className="midbar">
                <button className="cabpool" onClick={handleCabpool}>Cab-pool dashboard</button>
                <button className="lostfound" onClick={handleLostfound}>lost/found enquiry dashboard</button>
            </div>
            <div className="lowbar">
               <LowbarSelect sel={lowbar}/>
            </div>
        </div> 
    )
}

export default Main;