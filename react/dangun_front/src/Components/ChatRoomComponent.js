import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { timeFormatFunc } from "../utils/timeUtil";
import { TYPE } from "../utils/enumObjUtil";

const ChatRoomComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userName, setUserName] = useState("");
  const socketRef = React.useRef(null);
  const {roomId, sender, itemId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:9090/chat/get-msg/${roomId}`,{}, { withCredentials: true }).then((res)=>{
      console.log(res);
      setMessages(res.data);
    })
    axios.get(`http://localhost:9090/get-user/${sender}`).then((res) => {setUserName(res.data.name)});
    socketRef.current = new WebSocket("ws://localhost:9090/connection");
    socketRef.current.onopen = () => {
       
    };

    socketRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if(data.TYPE == TYPE.MSG){
        setMessages((prev) => [...prev, {SENDER: data.SENDER, MSG : data.MSG, TIMESTAMP : data.TIMESTAMP}]);
      }else if(data.TYPE == TYPE.END){
        if(window.confirm("거래 완료 요청이 들어왔습니다.")){
          // 거래 성사 API 호출
          const response = await axios.post("http://localhost:9090/item/deal-over",{id: itemId}, { withCredentials: true });
          if(response.status == 200){
            alert("거래가 완료되었습니다.");
          }
          navigate(`/item/complete/${itemId}`);
          // 별점 요청 페이지로 redirect
        }else{
          alert("거래가 계속됩니다.");
        }
      }
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed.");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const chatEndFunc = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      if(window.confirm("거래 완료 요청을 보냅니다.")){
        socketRef.current.send(JSON.stringify({TYPE : TYPE.END}));
      }
    }
  }

  const sendMessage = async () => {
    const currentTime = timeFormatFunc();
    try{
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ TYPE: TYPE.MSG, SENDER : userName, MSG: input, TIMESTAMP : currentTime})); 
        const addRequest = await axios.post("http://localhost:9090/chat/add-msg", {
          roomId: roomId,
          sender : sender,
          message : input
       });
       if(addRequest.status == 200){
        console.log("message add success");
      }}
    }catch (err) {
       console.error("Error parsing message:", err);
     }
     setMessages((prev) => [...prev, { SENDER : userName, MSG: input, TIMESTAMP:currentTime}]);
      setInput("");
    }

  return (
    <div>
      <h1>WebSocket Chat {isConnected ? "🟢" : "🔴"}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>[{msg.SENDER}]</strong> "{msg.MSG}"   <small>{msg.TIMESTAMP}</small>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>전송</button>
      <button onClick={chatEndFunc}>거래 완료</button>
    </div>
  );
}; 

export default ChatRoomComponent;