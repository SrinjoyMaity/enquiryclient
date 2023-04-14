import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LowbarSelect(props)
{
    const navigate=useNavigate();
    if(props.sel===0)
    {
        return <div></div>
    }
    else if(props.sel===1)
    {
        return <h1>This page is to edit your profile</h1>
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
        return <h1>This page is deactivate window</h1>
    }
    else
    {
        return <div></div>
    }
}
export default LowbarSelect;