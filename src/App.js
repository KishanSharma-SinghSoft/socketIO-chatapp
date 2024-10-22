import logo from "./logo.svg";
import "./App.css";
import { Login } from "./components/Login/Login";
import { useState } from "react";
import { GroupChat } from "./components/Message/GroupChat";
import ChatRoom from "./components/Message/ChatRoom";
import UserList from "./components/Message/UserList";
import { LoginOneTOOne } from "./components/Login/LoginOneTOOne";
import { BrowserRouter, Router,Route,Routes } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");
  const [room, setRoom] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isPrivate,setPrivate]=useState(false)

  return (

    <div>


      {!isLoggedIn  ? (
        <LoginOneTOOne
          username={username}
          setUsername={setUsername}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <ChatRoom username={username} recipient={recipient} setRecipient={setRecipient} room={room} setRoom={setRoom}/>
      )}
{/* 
{!isLoggedIn ? (
        <Login
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <GroupChat room={room} username={username} />
      )} */}

    </div>
  );
}

export default App;
