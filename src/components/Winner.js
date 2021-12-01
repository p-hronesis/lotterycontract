import Web3 from "web3";

function Winner(props) {
    return (
        <>
            <td className={"recent-winner"}>{props.winner.player}</td>
            <td className={"recent-winner"}>{parseFloat(Web3.utils.fromWei(props.winner.entranceFeeInWei + '', "ether")).toFixed(3)}eth</td>
            <td className={"recent-winner"}>{props.winner.applicants} applicant(s)</td>
            <td className={"recent-winner"}>{parseFloat(Web3.utils.fromWei(props.winner.amountWon + '', "ether")).toFixed(3)}eth</td>
            <td className={"recent-winner"}>{new Date(props.winner.closedDate * 1e3).toLocaleString()}</td>
        </>
    );
}

export default Winner;