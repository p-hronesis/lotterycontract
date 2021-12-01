
function HowItWorks(props) {
    return (
        <div className={"how-it-works"} >
            <p className={"how-it-works-heading"}> How it Works</p>
            <p className={"paragraph"}>Easylottery is a completely decentralized lottery application where you can enter lottery with a particular
                amount of ether and then stand a chance to win 100% of the total amount invested into the lottery session.
                The Lottery system is divided into 3 states namely Closed state, Open state, Calculating winner state.
                <br />
                <span style={{ color: "red" }}>Note: This lottery system only works on the rinkeby testnet, it hasn't been deploy on any other ethereum network</span>
            </p>
            <div className={"lottery-state"}>
                <p>
                    Closed State:
                </p>
                <p>
                    In the closed state, users cannot enter lottery.  This state signifies that
                    the lottery has ended and needs to be started again. After this state is
                    the open state.
                </p>
            </div>
            <div className={"lottery-state"}>
                <p>
                    Open State:
                </p>
                <p>
                    In the open state, users can enter lottery with a minimum amount of 50usd worth of ethereum.
                    The lottery will remain open until it is ended by the user. After this state is the calculating winner state.
                    You can click the blue start lottery button on top if the lottery has not yet been started
                </p>
            </div>
            <div className={"lottery-state"}>
                <p>
                    Calculating <br /> Winner:
                </p>
                <p>
                    In the calculating winner state the lottery app generates a random number and uses
                    this random number to select a random winner. New entry into the lottery app is also
                    not allowed in these state. This is state usually takes about a minute before transitioning
                    automatically to the closed state
                </p>
            </div>

        </div>
    );
}

export default HowItWorks;