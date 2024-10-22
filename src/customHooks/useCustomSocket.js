import { useCallback, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { SOCKET_BASE_URL } from "../constants/apiConstants";

export const useCustomSocket= (username,recipient,room)=> { 
  const [socket, setSocket] = useState();
 
    const [socketResponse, setSocketResponse] = useState({
      room: "",
      content: "",
      username: "",
      messageType: "",
      createdDateTime: "",
     
    });

  
    const [isConnected, setConnected] = useState(false);
    // const sendData = useCallback(
    //   (payload) => {
    //     socket.emit("send_message", {
    //       receiver:recipient,
    //       content: payload.content,
    //       username: username,
    //       messageType: "CLIENT",
    //     });
    //   },
    //   [socket]
    // );

    const sendPrivateData = useCallback(
      (payload) => {
        socket.emit("send_private_message", {
                room:room,
                recipient:recipient,
                content:payload.content,
                sender:username,
                messageType: "CLIENT",
              
              });
      },
      [socket,room,recipient]
    );
    
    const onConnectHandler=(room,username,recipient)=>{
      setConnected(true);
      if (room && username) {
        socket.emit('joinRoom', room, username);
    }

      
    }
    useEffect(() => {
      const s = io(SOCKET_BASE_URL, {
        reconnection: false,
        query: `username=${username}&room=${room}&recipient=${recipient}`, //"room=" + room+",username="+username,
      });
      setSocket(s);
      // s.on("connect", (room,username,recipient) => {onConnectHandler(room,username,recipient)});
      s.on("connect", () => setConnected(true));
      s.on("read_message", (res) => {
  
        setSocketResponse({
          room:res.room,
          content: res.content,
          username: res.username,
          messageType: res.messageType,
          createdDateTime: res.createdDateTime,
          recipient:res.recipient
        });
      });
      return () => {
        s.disconnect();
      };
    }, [room,recipient,username]);
  
    return { socketResponse, isConnected, sendPrivateData };
  };
  