import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function AiTutor(props) {
    const [displayText, setDisplayText] = useState(""); // State to store the text to display
    const response = props.response;

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < response.length) {
                setDisplayText(prevText => prevText + response[index]); // Append one letter at a time
                index++;
            } else {
                clearInterval(intervalId); // Stop the interval when all letters are displayed
            }
        }, 100); // Change the interval duration as needed

        // Clean up function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [response]); // Trigger effect when response changes

    return (
        <section>
            <p>{displayText}</p> {/* Display the text */}
        </section>
    );
}
