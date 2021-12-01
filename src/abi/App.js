import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import { DAppProvider, ChainId, useEthers, useContractCall } from "@usedapp/core"
import { Header } from './components/Header';
import RecentWinners from './components/RecentWinners';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import abi from "./abi/lottery.json"
import { useContractFunction } from '@usedapp/core';

function App() {
  const appConfig = {
    supportedChains: [ChainId.Kovan, ChainId.Rinkeby, ChainId.Mainnet],
    readOnlyChainId: ChainId.Rinkeby,
    readOnlyUrls: {
      [ChainId.Mainnet]: "https://mainnet.infura.io/v3/0cec4276b0c9409c9f1c6b0e1ee7b0f1",
      [ChainId.Kovan]: "https://kovan.infura.io/v3/0cec4276b0c9409c9f1c6b0e1ee7b0f1",
      [ChainId.Rinkeby]: "https://rinkeby.infura.io/v3/0cec4276b0c9409c9f1c6b0e1ee7b0f1",
    },
    readOnlyLotteryContractAddress: {
      [ChainId.Mainnet]: "0xE9EFDee8FaD033D79289cA921608443EdE547B47",
      [ChainId.Kovan]: "0xE9EFDee8FaD033D79289cA921608443EdE547B47",
      [ChainId.Rinkeby]: "0x61fc507e6e2f41fb207c6fd21ed54cf8caf6ecf9",
    },
    readOnlyLotteryContractABI: abi,
  }
  // const { chainidy } = useEthers()
  const lotteryInterface = new utils.Interface(abi)
  const LotteryContractAddress = '0x61fc507e6e2f41fb207c6fd21ed54cf8caf6ecf9'
  const lotteryContract = new Contract("0x61fc507e6e2f41fb207c6fd21ed54cf8caf6ecf9", lotteryInterface)
  // const lotteryContract = new Contract(appConfig.readOnlyLotteryContractAddress[window.ethereum.networkVersion], lotteryInterface)
  function getRecentwinners() {

  }
  // console.log(appConfig.readOnlyLotteryContractAddress)
  console.log("Chain id:", window.ethereum.networkVersion, "||")

  const AppRecentWinner = () => {
    console.log(lotteryContract)
    const { state, send } = useContractFunction(lotteryContract, 'enter', {})
    const enterLottery = send({ value: utils.parseEther(0.01048) })
    //console.log("!!!!", enterLottery)
    console.log(state, "||||", send, "||||||||")
    // const EnterLottery = (etherAmount) => {
    //   console.log(send({ value: utils.parseEther(etherAmount) }))
    // }

  }
  // AppRecentWinner()
  return (
    <DAppProvider config={appConfig}>
      <Menu id={"Home"} />
      <Header />
      <table>
        <RecentWinners />
      </table>

      {/* <div className="App">
        <header className="App-header">
          <Menu />
        </header>
      </div> */}
    </DAppProvider>
  );
}

export default App;
