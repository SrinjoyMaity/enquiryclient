import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './cabpool.css';
import cab from "./images/cablogo.jpg";
import {useCookies} from "react-cookie";

function Cabpool(props)
{
    const navigate=useNavigate();
    const [data, setData]=useState(Array(12).fill(""));
    const [window, setWindow]=useState(1);
    const [disp, setDisp] =useState("");
    const [cookies, setCookie,removeCookie]=useCookies(['enquiryUser']);
    
    const handleChange=(event)=>
    {
        let update= data;
        update[parseInt(event.target.id)]=event.target.value;
        setData(update);
    }
    async function handleUpload(e)
    {
        e.preventDefault();
        if(data[0]==="")
        {
            setDisp("number is missing");
        }
        else if(data[1]==="")
        {
            setDisp("Time is missing");
        }
        else if(data[2]==="")
        {
            setDisp("Date is missing");
        }
        else if(data[3]==="")
        {
            setDisp("Pickup is missing");
        }
        else if(data[4]==="")
        {
            setDisp("Destination is missing");
        }
        else if(data[11]==="")
        {
            setDisp("seat slot is missing");
        }
       else
       {
        let output={
            phone:data[0],
            slots: data[11],
            date: data[2]+"T"+data[1],
            pickup: data[3],
            destination: data[4],
            }
            console.log(output);
            fetch(`http://localhost:2000/enquiry/addride`, {
                headers:
                {
                    'Content-Type': 'application/json',
                    "authorization": cookies.enquiryUser
                },
                method: 'POST' ,
                mode: 'cors',
                credentials:"same-origin",
                body:JSON.stringify(output)
                })
                .then(function(res){
                    if(res.status===200)
                     {   
                        handleCancel();
                        setDisp("update was successful");
                    }
                    else if(res.status===469)
                    {
                        navigate("/");
                    }
                    else
                    {
                        setDisp("Error occured in server");
                    }
                })
        }
    }
    const handleCancel=(event)=>
    {
        var reset=data;
        reset[1]="";
        reset[2]="";
        reset[3]="";
        reset[4]="";
        reset[0]="";
        reset[11]="";
        setData(reset);
        document.getElementById("1").value="";
        document.getElementById("2").value="";
        document.getElementById("3").value="";
        document.getElementById("4").value="";
    }
    function handleClick(event)
    {
        setWindow(parseInt(event.target.id)-5);
        if(window===2)
        {
          handleCancel();
        }
        else
        {
        }
    }
    function handleWindow()
    {
        if(window===2)
        {
            return(
                <div>
                    <form className="itemform" >
                    <div className="form"><label className="registerlabel"> Phone Number: <input className="registerinput" type="text" id="0" onChange= {handleChange}/></label></div>
                    <div className="form"><label className="registerlabel"> seat slots: <input className="registerinput" type="text" id="11" onChange= {handleChange}/></label></div>
                    <div className="form"><label className="registerlabel"> time: <input className="registerinput" type="time" id="1" onChange= {handleChange}/></label></div>
                    <div className="form"><label className="registerlabel">date: <input className="registerinput" type="date" id="2" onChange= {handleChange}/></label></div>
                    <div className="form"><label className="registerlabel">Pickup: <input className="registerinput" type="text" id="3" onChange= {handleChange}/></label></div>
                    <div className="form"><label className="registerlabel">Destination: <input className="registerinput" type="text" id="4" onChange= {handleChange}/></label></div>
                    </form>
                    <div className="picedit"> <img src={cab} className="itemimg" alt="Item_image" />
                    <button className="cancel" onClick={handleCancel}>cancel</button>
                    <button className="upload" onClick={handleUpload}>Upload</button>
                    <h1 className="editDisp">{disp}</h1>
                    </div>
                </div>
            )
        }
    }
    return(            
    <div className="lostpage">
                <div className="lostbar">
                    <h4 className="begin">Begin:</h4>
                    <input className="begInp" id="8" type="date" onChange= {handleChange}></input>
                    <h4 className="end">End:</h4>
                    <input className="endInp" id="9" type="date" onChange= {handleChange}></input>
                <input className="finditem"  id="10" type="text" onChange= {handleChange}></input>
                <button className="lostsearch" id="6" onClick={handleClick}>Search</button>
                <button className="lostadd" id="7" onClick={handleClick}>Create ride</button>
                <button className="myride" id="8" onClick={handleClick}>My rides</button>
                 </div>
                <div className="lostlowbar">
                    {
                        handleWindow()
                    }
                </div> 
            </div>
    )
}

export default Cabpool;