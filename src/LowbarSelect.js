import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editdetail from "./Editdetail.js";
import Deactivate from "./Deactivate.js";


function LowbarSelect(props)
{
    const navigate=useNavigate();
    if(props.sel===0)
    {
        return <div></div>
    }
    else if(props.sel===1)
    {
        return <Editdetail info={props.info} img={props.pp}/>
    }
    else if(props.sel===2)
    {
        return <h1>This page is to see car pool window</h1>
    }
    else if(props.sel===3)
    {
        return <h1>This page is to see lost and found window</h1>
    }
    else if(props.sel===4)
    {
        return <h1>This page is Admin window</h1>
    }
    else if(props.sel===5)
    {
        return <Deactivate info={props.info}/>
    }
    else
    {
        return <div></div>
    }
}
export default LowbarSelect;