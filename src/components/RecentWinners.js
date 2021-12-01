import Winner from "./Winner";
import React, { useState, useEffect } from 'react';
import RecentWinnersHeader from "./RecentWinnersHeader";

const winnersheader = [{ address: "Winners", fee: "Entrance fee", won: "Amount Won", date: "Closed", applicants: 'Applicants' }]
function RecentWinners(props) {
    const [recentWinners, setrecentWinners] = useState(props.recentWinners);
    return (
        <tbody id={"Recent winners"} className={"recent-winners"}>
            <tr className={"recent-winners-heading"}><td>Recent Winners</td></tr>
            <tr className={"recent-winners-table"} >
                {winnersheader.map((header) => {
                    return (
                        <RecentWinnersHeader key={header.address.toString()} header={header} />
                    );
                })}
                {props.recentWinners.map((winner, index) => {
                    return (
                        <Winner key={index} winner={winner} />
                    );
                })}
            </tr>
        </tbody>
    )
}

export default RecentWinners;