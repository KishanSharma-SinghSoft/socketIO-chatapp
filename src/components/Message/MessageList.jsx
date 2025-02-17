import React, { useEffect, useRef } from "react";
import "./Message.css";
import { MessageItem } from "./MessageItem";

export const MessageList = ({ messageList,username,recipient}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messageList,username,recipient]);

  return (
    <div className="message_list">
      {messageList.map((x, idx) => (
        <MessageItem key={idx} message={x} username={username} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
