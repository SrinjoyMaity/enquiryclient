import { useState } from "react";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login(props)
{
    const [data, setData]=useState(Array(3).fill(false));
    const [disp, setDisp] =useState("");
    const [cookies, setCookie,removeCookie]=useCookies(['enquiryUser']);
    const navigate=useNavigate();

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
                    if(res.status===504)
                    {
                        setDisp("something went wrong in the server");
                    }
                     if(res.status===406)
                    {
                        setDisp("password or email is incorrect");
                    }
                     if(res.status===200)
                     {
                        res.json().then(function(res)
                        {
                            console.log(res);
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
    return (
        <div>
        <form onSubmit= {handleSubmit}>
            <h1>Log in</h1>
            <label> E-mail:<input type="text" id="1" onChange= {handleChange}/></label>
            <label> Password<input type="text"  id="2" onChange= {handleChange}/></label>
            <input type="submit"  value="log in" />
            <button onClick={handleClick}> Register</button>
        </form>
        <h4>{disp}</h4>
        </div>
    )
}

export default Login;