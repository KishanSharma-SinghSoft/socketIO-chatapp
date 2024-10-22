import React, { useEffect, useState } from 'react'
import { useFetch } from '../../customHooks/useFetch';
import { API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import './Message.css'

function UserList({recipient,setRecipient}) {

    const[user,setUser]= useState();



        useEffect(()=>{
            const fetchUser =async()=>{
                const response = await axios.get(API_BASE_URL+"/recipient")
                setUser([...response.data])
            }
            fetchUser()
        },[recipient])

        const recipientHandler=(id)=>{
           setRecipient(id)
        }

  return (
    <div className='container'>
        <h2 >select recipient</h2>
      {user?.map((element,idx)=>{
        return (
           
            <button key={element.userId} className='user-title' onClick={()=>{recipientHandler(element.username)}}>{element.username}</button>
   
        )

      })}
    </div>
  )
}

export default UserList
