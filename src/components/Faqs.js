import { useState } from "react"
import Faq from "./Faq"
const frequentlyAskQuestion = [
    { question: 'How do I enter lottery?', answer: 'Make sure your metamask is connected and click the glowing "Enter Lottery" image' },
    { question: 'How do I get free ether to play?', answer: 'visit "https://faucet.rinkeby.io/" and follow the instructions get free ether to play' },
    { question: 'How is the winner choosen?', answer: 'first the lottery contract generates a random number using chainlink, this random number is used to select a random winner from the list of participants' },
    { question: 'what is the lottery contract address?', answer: 'Not for now, these lottery contract only works on the rinkeby ethereum testnet' },
    { question: 'Can I play on the mainnet', answer: 'Not for now, these lottery contract only works on the rinkeby ethereum testnet' },



]

function Faqs(props) {

    const [faqs, setFaqs] = useState(frequentlyAskQuestion)
    return (
        <div className={"faqs"} >
            <p className={"how-it-works-heading"}> Frequently Asked question</p>

            {
                faqs.map((faq, index) => {
                    return (
                        <Faq faq={faq} key={index} />
                    )
                })}
        </div >
    )
}


export default Faqs