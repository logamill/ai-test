import { useState, useEffect } from "react";
import axios from 'axios';

export default function GenerateText() {
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  function handleTextUpdate(e) {
    setUserText(e.target.value);
  }
  function handleTextSubmit(e) {
    e.preventDefault();
    getTextFromOpenAI();

  }

  function handleImgSubmit(e) {
    e.preventDefault();
    getImgFromOpenAI();
  }

  async function getTextFromOpenAI() {
    try {
        const response = await axios.post('http://localhost:3033/api/openai/generate-text', { userText });
        console.log(response)
        setAiText(response.data.text)
    }catch (error) {
        console.error('Error generating text:', error);
    }
  }

  async function getImgFromOpenAI() {
    try {
        const response = await axios.post('http://localhost:3033/api/openai/generate-image', { userText });
        console.log(response.data.url)
        setImageUrl(response.data.url)
    }catch (error) {
        console.error('Error generating text:', error);
    }
  }

  return (
    <div style={{ margin: "5%"}}>
      <form style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <textarea placeholder="Try me..." value={userText} rows="5" cols="50" onChange={(e) => (handleTextUpdate(e))}></textarea>
        <button onClick={(e) => handleTextSubmit(e)}>submit</button>
        <button onClick={(e) => handleImgSubmit(e)}>Submit Image</button>
      </form>

      <div>
        { aiText ?
        <>
            <h3>Prompt was: {userText}</h3>
            <p>{aiText}</p>
        </>
        :
        <div></div>
        }   
        { imageUrl ?
        <>
            <img src={`${imageUrl}`} alt="ai-response" />
        </>
        :
        null
        }
      </div>
    </div>
  );
}
