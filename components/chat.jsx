import React, { useState, useRef, useEffect } from "react";
import Styles from "./styles.module.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const Chat = () => {
  const boxRef = useRef();
  const [open, setOpen] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [received, setReceived] = useState([""]);
  const [messages, setMessages] = useState([{ text: "hello there", type: 1, id: uuidv4() }]);
  const [rtt, setRtt] = React.useState(0);

  useEffect(() => {
    setRtt(open ? 1 : 0);
  }, [open]);

  useEffect(() => {
    const l = received.length;
    if (received[l - 1]) {
      setMessages([...messages, { text: received[l - 1], type: 1, id: uuidv4() }]);
    }
  }, [received.length]);

  useEffect(() => {
    if (open) {
      const objDiv = boxRef.current;
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [messages.length]);

  const handleInput = (e) => {
    e.preventDefault();
    if (currentInput) {
      setMessages([...messages, { text: currentInput, type: 0, id: uuidv4() }]);

      axios
        .post("http://e2400b83f185.ngrok.io/", {
          text: currentInput,
        })
        .then(function (response) {
          setReceived([...received, response.data.text]);
        })
        .catch(function (error) {
          console.log(error);
        });

      setCurrentInput("");
    }
  };

  const handleChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={Styles.container}>
      {open ? (
        <div className={Styles.chatBox}>
          <div className={Styles.chatTitle}>
            SENSEBOT <div className={Styles.sub}>Try out now</div>
          </div>
          <div className={Styles.chatMessage} ref={boxRef}>
            {messages.map((msg) => {
              return (
                <div className={msg.type === 0 ? Styles.sentMessage : Styles.receivedMessage} key={msg.id}>
                  {msg.text}
                </div>
              );
            })}
          </div>
          <div className={Styles.chatInputContainer}>
            <form action="" onSubmit={handleInput} autoComplete="off">
              <input
                type="text"
                name="chatInput"
                value={currentInput}
                placeholder="Type message here..."
                className={Styles.chatInput}
                onChange={handleChange}
                // onKeyDown={handleInput}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className={Styles.messageNow}>
          <div className={Styles.chatNowTitle}>
            <Image
              src="/logoOnly.jpg"
              width={108}
              height={130}
              alt="sensebot-logo"
              className={open ? Styles.rtt : Styles.normal}
            />
          </div>
          <div className={Styles.chatNow} onClick={handleToggle}>
            Chat Now
          </div>
        </div>
      )}
      <div className={Styles.toggleButton}>
        <Image src="/chat.png" width={50} height={50} alt="chat-icon" onClick={handleToggle} rtt={rtt} />
      </div>
    </div>
  );
};

export default Chat;
