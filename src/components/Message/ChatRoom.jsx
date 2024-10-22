import React, { useEffect, useState } from "react";
import { useSocket } from "../../customHooks/useSocket";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import "./Message.css";
import { MessageList } from "./MessageList";
import { timeStampConverter } from "../../util/timeUtils";
import { useFetch } from "../../customHooks/useFetch";
import {useCustomSocket} from "../../customHooks/useCustomSocket"
import UserList from "./UserList";


function ChatRoom({username,recipient,setRecipient,room ,setRoom}) {



  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  //customized hook ,usefetch to fetch message list between user and recipient

  const { responseData, error, loading } = useFetch("/between/"+username+"/"+recipient);

//customized hook,useCustomHook to set connection with socket and listen to socket
  const { isConnected, socketResponse, sendPrivateData } = useCustomSocket(username,recipient,room);

//function to add the message into messageList 

  const addMessageToList = (val) => {
    if (val.recipient == "") return;
    setMessageList([...messageList, val]);
  };



useEffect(()=>{
  //create a unique room with username and recipient details
  const room = [username, recipient].sort().join(':');

  //set Room
setRoom(room)
},[room,recipient,username])
  

  useEffect(() => {

    //set messageList with response data 
    if (responseData != undefined) {
      setMessageList([...responseData]);
    
      
    }
  }, [responseData]);


  useEffect(() => {
    //add message into message list with socket response
    addMessageToList(socketResponse);
  }, [socketResponse]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput != "") {
      sendPrivateData({
        content: messageInput,
      });
      const time = ""; //timeStampConverter(Math.floor(Date.now() / 1000));
      addMessageToList({
        room:room,
        recipient:recipient,
        content: messageInput,
        sender: username,
        createdDateTime: new Date(),
        messageType: "CLIENT",
      });
      setMessageInput("");
    }
  };

  return (
    <div className="message_root_div">
    <span className="user_name">Welcome: {username} </span>
    <div className="chat-navigation">
    <div className="user-list">
          {/* component to Show the userList */}
      
      <UserList recipient={recipient} setRecipient={setRecipient}/> 
   
     </div>
    <div className="message_component">
      <div className="recipient-header"><h3>{recipient}</h3></div>

      {/*componet to show the messageList*/}
     <MessageList username={username} messageList={messageList} recipient={recipient}/>
      <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">
          {messageInput == "" ? (
            <RiSendPlaneLine size={25} />
          ) : (
            <RiSendPlaneFill color="#2671ff" size={25} />
          )}
        </button>
      </form>
    </div>
    </div>
  </div>
  )
}

export default ChatRoom
