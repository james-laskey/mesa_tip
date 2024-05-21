import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom";
import AiTutor from "./AiTutor/Main";
import LoadingScreen from "./LoadingScreen";


export default function Layout(props){
    const [isLoading, setLoading] = useState(false)
    let [tool, setTool] = useState()
    const [ queryText, setQueryText] = useState('')
    const [history, setHistory] = useState([{'role':'system', 'content':'"You are a friendly and helpful teaching assistant. You explain concepts in great depth using simple terms, and you give examples to help people learn. At the end of each explanation, you ask a question to check for understanding"'}])
    const [tutor, setTutor] = useState(true)
    const [general, setGeneral] = useState(false)
    const [owlchat, setOwlChat] = useState(false)
    const [response, setResponse] = useState(null)
    const [helpModal, toggleHelpModal] = useState(false)
    // useEffect(()=>{

    // }, [notifications])
    // useEffect(()=>{ //take into account the intructions for each model and transitions

    // })

    function handleChangeOfModel(model){
        switch(model) {
            case 'tutor':
                setTutor(true)
                setGeneral(false)
                setOwlChat(false)
                break;
            case 'general':
                setTutor(false)
                setGeneral(true)
                setOwlChat(false)
                break;
            case 'owlChat':
                setTutor(false)
                setGeneral(false)
                setOwlChat(true)
                break;
        }
    }

    function handleQuerySubmit(query){
        //make query with model and then
        setLoading(true)
        const body = {
            query: queryText,
            history: history.concat(['User: ' + queryText]),
            tutor: tutor,
            general: general, 
            owlchat: owlchat
        }
        fetch(`/chat`, {
            method: "POST",
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify(body)
        })
        .then(response=>response.json())
        .then(json=>{
            if(json.success){
                console.log(json)
                setResponse(json.response)
                setHistory(history+={'role': 'assistant', 'content': json.response.choices[0]});
            } else {
                //handle error
                //setError(json.error)
                console.log(error)
            }
        })
        .finally(setLoading(false))
    }
    return (
        <section>
            {isLoading && <LoadingScreen/>}
            
            <div id='response-view'>
                {response && <ResponseParser response={response} tutor={tutor} general={general} owlchat={owlchat}/>}
                {!response &&
                <div>
                    <div id='instructions'>
                        {tutor && <div><p>
                            Ask Sophia questions about your homework. The responses will try and guide you to the right answer and more often than not
                            will not give you the full answer.
                        </p></div>}
                    </div>
                    <div id='center-mic'>
                        <div>
                            <button onClick={()=>handleMicButtonClick()}>MIC</button>
                        </div>
                        <div>
                            <button class="menu-button" onClick={(e)=>handleChangeOfModel('tutor')}>T</button>
                            <button class="menu-button" onClick={(e)=>handleChangeOfModel('general')}>G</button>
                            <button class="menu-button" onClick={(e)=>handleChangeOfModel('owlchat')}>O</button>
                        </div>
                    </div>    
                </div>}
            </div>
            
            <div>
                <section id='text-input'>
                    <input type='text' placeholder="Use the mic or type in your response..." onInput={(e)=>setQueryText(e.target.value)} name='text-input' id='text_input_selector'/>
                    <button onClick={()=>handleQuerySubmit()} className="submit-button">Ask</button>
                </section>
            </div>
        </section>
    )
    
}
