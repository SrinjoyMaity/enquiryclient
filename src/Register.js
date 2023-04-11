import { useState } from "react";

function Register(props)
{
    const [data, setData]=useState(Array(7).fill(false));
    const [disp, setDisp] =useState("");
   
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
            setDisp("first name is missing, Provide necessary details or rewrite it to resolve this");
        }
        else if(data[2]==false)
        {
            setDisp("last name is missing, Provide necessary details or rewrite it to resolve this");
        }
        else if(data[3]==false)
        {
            setDisp("E-mail is missing, Provide necessary details or rewrite it to resolve this");
        }
        else if(data[4]==false)
        {
            setDisp("Roll number is missing, Provide necessary details or rewrite it to resolve this");
        }
        else if(data[5]==false)
        {
            setDisp("Date of Birth is missing, Provide necessary details or rewrite it to resolve this");
        }
        else if(data[6]==false)
        {
            setDisp("Password is missing, Provide necessary detail or rewrite it to resolve this");
        }
        else
        {
            let output={
                firstname: data[1],
	            lastname: data[2],
	            roll: data[4],
	            email: data[3],
	            birthdate: data[5],
	            password: data[6]
            }
            console.log(output);
            fetch(`http://localhost:2000/enquiry/register`, {
                headers:{
                    "Content-Type": "application/json"
                },    
                method: 'POST' ,
                    mode: 'cors',
                    credentials:"same-origin",
                    body: JSON.stringify(output)
                })
                .then(function(res){
                    if(res.status==504)
                    {
                        setDisp("something went wrong in the server");
                    }
                     if(res.status==406)
                    {
                        setDisp("The roll number or email already exists");
                    }
                     if(res.status==204)
                     {
                        setDisp("Account created succesfully!!!");
                     }
                })
        }
        event.preventDefault();
    }
    return (
        <div>
        <form onSubmit= {handleSubmit}>
            <h1>Create Account</h1>
            <label> First Name: <input type="text" id="1" onChange= {handleChange}/></label>
            <label>Last Name: <input type="text" id="2" onChange= {handleChange}/></label>
            <label> E-mail:<input type="text" id="3" onChange= {handleChange}/></label>
            <label> Roll number:<input type="text" id="4" onChange= {handleChange}/></label>
            <label> Date of Birth:<input type="date" id="5" onChange= {handleChange}/></label>
            <label> Password<input type="text"  id="6" onChange= {handleChange}/></label>
            <input type="submit"  value="Sign Up" />
        </form>
        <h4>{disp}</h4>
        </div>
    )
}
export default Register;