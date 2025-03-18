import React, { useState } from 'react'
import './MessageForm.css'
import tick from '../../assets/icons8-tick.svg'
import wrong from '../../assets/icons8-wrong-50.png'

const MessageForm = () => {
    const [message, setMessage] = useState("")
    const [result, setResult] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!message.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ text: message })

            })

            const data = await response.json()
            setResult(data.prediction)
        }
        catch (error) {
            console.error("Error:", error)
        }
    }


    return (
        <div className='form-container'>
            <p className='title-question'>Is your content spam free ?</p>
            <p>Use our AI powered detector to find out</p>

            <div className="result-form-container">
                <form action="">
                    <input type="text" placeholder='Please enter your text' onChange={e => setMessage(e.target.value)} value={message} />
                    <button className='submit-button' onClick={handleSubmit}>Check for spam</button>
                </form>
                <div className="result-div">
                    <h2>Your message is {result && <span className={`result ${result}`}>{result}</span>}
                    </h2>
                    {result &&
                        <div className="check-buttons">
                            <button className='right'>
                                <img src={tick} alt="" />
                            </button>
                            <button className='wrong'>
                                <img src={wrong} alt="" />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageForm
