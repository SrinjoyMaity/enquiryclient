import { useState, useEffect } from "react";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import './login.css';
import logo from './images/enquirylogo.png';
import bg from './images/background.png';


function Login(props)
{
    

    const [data, setData]=useState(Array(3).fill(false));
    const [disp, setDisp] =useState("");
    const [cookies, setCookie,removeCookie]=useCookies(['enquiryUser']);
    const navigate=useNavigate();

    useEffect(()=>{
        if(cookies.enquiryUser!== undefined)
        {
            console.log(cookies.enquiryUser);
                navigate("/main");
        }
})

    const handleChange=(event)=>
    {
        let update= data;
        update[parseInt(event.target.id)]=event.target.value;
        setData(update);
    }
    const handleSubmit=(event)=>
    {
        if(data[1]==false)
        {
            setDisp("Email is missing, Provide necessary details or rewrite it to resolve this");
        }
        else if(data[2]==false)
        {
            setDisp("password is missing, Provide necessary details or rewrite it to resolve this");
        }
        else
        {
            let output={
	            email: data[1],
	            password: data[2]
            }
            console.log(output);
            fetch(`http://localhost:2000/enquiry/login`, {
                headers:{
                    "Content-Type": "application/json"
                },    
                method: 'POST' ,
                    mode: 'cors',
                    credentials:"same-origin",
                    body: JSON.stringify(output)
                })
                .then(function(res){
                    if(res.status===503)
                    {
                        setDisp("the email or password you provided might not be in the server, or the server is currently unavailable");
                    }
                     if(res.status===406)
                    {
                        setDisp("password or email is incorrect");
                    }
                     if(res.status===200)
                     {
                        res.json().then(function(res)
                        {
                            console.log(cookies.enquiryUser);
                            setCookie("enquiryUser",res.token, {path: '/'});
                            setDisp("Account found");
                        })
                     }
                })
        }
        event.preventDefault();
    }
    function handleClick(event)
    {
        navigate("/register");
        event.preventDefault();
    }
    
    if(cookies.enquiryUser!== undefined)
    {
        console.log(cookies.enquiryUser);
            navigate("/main");
    }

    return (
        <div>
         <img src={bg} id="background" alt="background"/>
         <img src={logo} id="logo2" alt="logo"/>
        <form id="log" onSubmit= {handleSubmit}>
            <h1>Sign in</h1>
            <div><label> E-mail:<input type="text" id="1" onChange= {handleChange}/></label></div>
            <div><label> Password<input type="text"  id="2" onChange= {handleChange}/></label></div>
            <div><input type="submit"  value="log in" />
            <button onClick={handleClick}> Register</button></div>
        </form>
        <h4>{disp}</h4>
        </div>
    )
}

export default Login;