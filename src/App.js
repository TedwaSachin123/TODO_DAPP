
import React, { useEffect, useState } from "react";
import Manager from "./artifacts/contracts/Manager.sol/Manager.json";
import { ethers } from "ethers";



const App=()=>{
    const[name,setname]=useState('');
    const[account,setaccount]=useState('');
    const[contract,setcontract]=useState(null);
    const[tickets,settickets]=useState([]); //store value in arr

        
    const namehandler = async(e)=>{
        setname(e.target.value);
    }
    const getTicket = async () => {
        const result= await contract.gettickets();
        settickets(result);
    }

    const createTicket =  async(_name)=>{
        const result= await contract.createticket(_name);
        await result.wait();
        getTicket();
        setname("");

    }
    
    const updateTicketname =  async(_index)=>{
        let newName = prompt("Please enter new ticket name","");
        const result= await contract.updateticketname(_index,newName);
        await result.wait();
        getTicket();
    }

    const updateStatus =  async(_index, _status)=>{
        const result= await contract.updatestatus(_index,_status);
        await result.wait();
        getTicket();
    }
    
    const initconnection = async() =>{
        if(typeof window.ethereum !== "undefined"){
            //get account address
            const accounts = await window.ethereum.request({
                method:"eth_requestAccounts",
            });
            const provider=new ethers.providers.Web3Provider(window.ethereum);
            const newSigner=provider.getSigner();
            setaccount(accounts[0]);
            
            setcontract(
                new ethers.Contract(
                    "0x54a5258e7c2b586E32A207cec5C60fC0Ee04ba52",
                    Manager.abi,
                    newSigner
                )
            )
            
            
        } 
        else{
            console.log("please install metamask");
        }
    };
    

    useEffect(()=>{
        initconnection();
        
    },[]);
    

    console.log(tickets);
    
    return(
    <div className="page">
        <div>
        <div className="header">
            <p>Task Manager</p>
                       
            
            {account !== "" ?(
            <p>{account}</p>):<button className="connectbutton" onClick={initconnection}>Connect</button>}
        </div>
        
        <div className="input_section">
            <div>
            <input className="nameinput" value={name} type="text" onChange={namehandler} placeholder={"Type name"}></input>
            
                <button className="createticket" onClick={()=>{createTicket(name)}}>Create</button>
                <button className="loaddata" onClick={getTicket}>load data</button>
            </div>
        </div>
        
        <div className="main">
            <div className="todo" style={{background:"lightpink"}}>
                <div className="todo_ticket">Todo</div>
                {tickets.map((t,i)=>({id:i,item:t}))
                .filter(t=>t.item.status===0)
                .map((ticket,index)=> {
                    return (
                        <div>
                            <p>#{ticket.id}</p>
                            <p key={index}>{ticket.item.name}</p>
                            <button onClick={()=>updateStatus(ticket.id,1)}>busy</button>
                            <button onClick={()=>updateStatus(ticket.id,2)}>done</button>
                            <button onClick={()=>updateTicketname(ticket.id)}>rename</button>
                        </div>
                    )
                    })} 
            </div>
            <div className="working" style={{background:"lightgreen"}}>
                <div className="working_ticket">Working</div>
                {tickets.map((t,i)=>({id:i,item:t}))
                .filter(t=>t.item.status===1)
                .map((ticket,index)=> {
                    return (
                        <div>
                            <p>#{ticket.id}</p>
                            <p key={index}>{ticket.item.name}</p>
                            <button onClick={()=>updateStatus(ticket.id,0)}>Todo</button>
                            <button onClick={()=>updateStatus(ticket.id,2)}>done</button>
                            <button onClick={()=>updateTicketname(ticket.id)}>rename</button>
                        </div>
                    )
                    })} 
            </div>
            <div className="done" style={{background:"lightblue"}}>
                <div className="done_ticket">Done</div>
                {tickets.map((t,i)=>({id:i,item:t}))
                .filter(t=>t.item.status===2)
                .map((ticket,index)=> {
                    return (
                        <div>
                            <p>#{ticket.id}</p>
                            <p key={index}>{ticket.item.name}</p>
                            <button onClick={()=>updateStatus(ticket.id,0)}>Todo</button>
                            <button onClick={()=>updateStatus(ticket.id,1)}>busy</button>
                            <button onClick={()=>updateTicketname(ticket.id)}>rename</button>
                        </div>
                    )
                    })} 
            </div>
        </div>
        </div>
        
    </div>);
    

}

export default App;