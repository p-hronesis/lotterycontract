import { useState } from "react"



function Faq(props) {

    const [isOpen, setisOpen] = useState(false)
    return (
        <div className={"faq"} onClick={() => {
            setisOpen(!isOpen)
        }}>
            <p className={"question"}>{props.faq.question}</p>
            <div className={isOpen ? "answer" : "answer hide"}>{props.faq.answer}</div>
        </div>
    )
}

export default Faq