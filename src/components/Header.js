import { useEthers } from "@usedapp/core";
import { Button, makeStyles } from "@material-ui/core"
import rejoicingman from "../rejoicing-main.png"
import { UseContractMethod } from "../hooks";

const useStyles = makeStyles((theme) => ({
    green: {
        background: "#00FF2A"
    },
    pink: {
        background: "#FF0077"
    },
    container: {
        padding: "72px 0px 72px 72px",
        display: "flex",
        justifyContent: "flex-start",
        gap: theme.spacing(1)
    }
}))
export const Header = (props) => {
    const classes = useStyles()
    const { activateBrowserWallet, deactivate, account } = useEthers()
    const isConnected = account != undefined
    const recentW = props.recentWinner
    return (
        <div className={classes.container}>


            <div className={"full-width"}>
                <div className={"header-connect"}>

                    <div>
                        <p>{props.account}</p>
                        {props.isConnected ? <button color="green" className={"btn connect-btn connected"}>
                            Connected


                        </button> :
                            <button color="primary" className={"btn connect-btn"} onClick={() => {
                                props.connectMetaMask()
                            }}>
                                Connect wallet


                            </button>
                        }
                    </div>

                    <p><div>{props.lotteryState === 'Ongoing' ? <button color="green" onClick={() => {
                        props.endLottery()
                    }}>End Lottery</button> :
                        props.lotteryState == 'Ended/Not Started' ? <button color={"primary"} onClick={() => {
                            props.startLottery()
                        }}>Start Lottery</button> : props.lotteryState}</div>Lottery State: <span>{props.lotteryState}</span></p>
                </div>
                {<div className={"header-hero"}>
                    <div className={"header-hero-item1"}>
                        You can enter with at least 50 usd worth of ethereum

                    </div>
                    <button className={"header-hero-item2"} onClick={() => {
                        props.enterLottery()
                    }}>

                        Enter <br />Lottery



                    </button>
                    <div className={"header-hero-item3"}>
                        <img src={rejoicingman} width={"500px"} height={"400px"} >
                        </img>
                    </div>

                </div>}
            </div>
        </div >
    )
}