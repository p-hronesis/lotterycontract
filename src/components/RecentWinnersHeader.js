
function RecentWinnersHeader(props) {
    return (
        <>
            <td className={"recent-winners-th"}><div>{props.header.address}</div></td>
            <td className={"recent-winners-th"}><div>{props.header.fee}</div></td>
            <td className={"recent-winners-th"}><div>{props.header.applicants}</div></td>
            <td className={"recent-winners-th"}><div>{props.header.won}</div></td>
            <td className={"recent-winners-th"}><div>{props.header.date}</div></td>
        </>
    );
}

export default RecentWinnersHeader;