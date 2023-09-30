import React, { useState, useEffect, useRef } from "react";
import TopNaviagation from "./TopNaviagation";
import { useGetResponseMutation } from "../Services/MessageSlice";
import SiriWaveEffect from "./SiriWaveEffect";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
function Message() {
  const ButtonRef = useRef(null);
  const [CreateQuestion, Response] = useGetResponseMutation();
  const [transcript, setTranscript] = useState("");
  const [IsMicStart, SetIsMicStart] = useState(false);
  const [StartVoiceAssistant, SetStartVoiceAssistant] = useState(false);
  const [ResponsesMessage, SetResponsesMessage] = useState([
    {
      IsServerSide: true,
      Message: "Hello! How can I assist you today?",
      Time: new Date(),
    },
  ]);

  useEffect(() => {
    const PunchReponse = async () => {
      if (Response.isLoading === false && Response.status === "fulfilled") {
        let UserSide = [...ResponsesMessage];
        UserSide.push({
          IsServerSide: true,
          Message: Response.data.data,
          Time: new Date(),
        });
        speak(Response.data.data);
        SetResponsesMessage(UserSide);
      }
    };
    PunchReponse();
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        ButtonRef.current.click();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [Response]);


  const GetResponse = async () => {
    stopListening();
    let message = document.getElementById("messagebox").value;
    if (message.trim() !== "") {
      let UserSide = [...ResponsesMessage];
      UserSide.push({
        IsServerSide: false,
        Message: message,
        Time: new Date(),
      });
      SetResponsesMessage(UserSide);
      document.getElementById("messagebox").value = "";
      await CreateQuestion({ Question: message });
    }
  };

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;

    const transcript1 = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
      console.log(transcript1)
    document.getElementById("messagebox").value = transcript1;
    console.log(transcript1);
    setTranscript(text);
  };

  const startListening = () => {
    recognition.continuous = true;
    recognition.interimResults = true;
    SetIsMicStart(true);
    SetStartVoiceAssistant(true);
    recognition.start();
  };

  const stopListening = () => {
    SetIsMicStart(false);
    recognition.continuous = false;
    SetStartVoiceAssistant(false);
    recognition.stop();
  };

  const speak = (TXT) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(TXT);
    synth.speak(utterance);
  };

  return (
    <>
      <TopNaviagation />

      <div className="container-fluid ">
        <div className="col-md-12 p-3 mb-5">
          <div className="chat-messages mx-auto col-md-10 mt-5">
            {ResponsesMessage.map((el) =>
              el.IsServerSide ? (
                <div key={el.id} className="message-box-holder">
                  <div className="message-sender">NLP System</div>
                  <div className="message-box message-partner">
                    {el.Message}
                  </div>
                </div>
              ) : (
                <div className="message-box-holder">
                  <div className="message-box">{el.Message}</div>
                </div>
              )
            )}
          </div>
        </div>

        <nav className="navbar fixed-bottom sendMessagebox bottomNav mx-auto">
          <div className="container">
               <div className="col-md-8 mx-auto">
               <div className="row height d-flex justify-content-center align-items-center">

<div className="d-flex align-items-center ">
<div className="flex-shrink-0">
{IsMicStart ? (<button className="btn mic" onClick={() => {
                        stopListening();
                      }}>
<i className="bi bi-mic-mute-fill"></i>
</button> ):(<button className="btn mic"  onClick={() => {
                        startListening();
                      }}>
<i className="bi bi-mic-fill"></i>
</button> )}

</div>
<div className="flex-grow-1 ">
{StartVoiceAssistant == false ? (
                    <input type="text"  id="messagebox" className="form-control" placeholder="Please enter question..."/>
                  ) : (
                   <div className="col-md-7 mx-auto">
                        <SiriWaveEffect />
                        <input
                      type="text"
                      className="form-control"
                      id="messagebox"
                      hidden={true}
                      placeholder="Enter your message"
                    />
                      </div> )}
</div>
<div className="flex-shrink-0">
<button className="btn send" ref={ButtonRef} disabled={Response.isLoading ? true : false}
                    onClick={() => {
                      GetResponse();
                    }}>
<i className="bi bi-send"></i>
</button>
</div>
</div>

</div>
               </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Message;
