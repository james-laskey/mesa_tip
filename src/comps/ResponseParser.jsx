import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom";
import AiTutor from "./AiTutor/Main";

export default function ResponseParser(props){
    const [tutor, setTutor] = useState(false || props.tutor)
    const [general, setGeneralModel] = useState(false || props.general)
    const [owlchat, setOwlChat] = useState(false || props.owlChat)
    // let [] = useState()
    // useEffect(()=>{

    // }, [notifications])
    // useEffect(()=>{

    // })

    
    return(
        
        <section>
            {tutor && <AiTutor response={response}/>}
        </section>
    )
}
