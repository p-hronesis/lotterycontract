import './App.css';
import Menu from './components/Menu';
import { Header } from './components/Header';
import RecentWinners from './components/RecentWinners';
import HowItWorks from './components/HowItWorks';
import Faqs from './components/Faqs';
import Web3 from 'web3';
import abi from "./abi/lottery.json"
import { useEffect, useState } from 'react';
const INFURA_ENDPOINT = "https://rinkeby.infura.io/v3/c95d9276d5e041acbe6411cdda48275e"
function App() {

  const LotteryContractAddress = '0x65fd425aD3f20835662A9447677A7df40055EF68'
  const [recentWinners, setrecentWinners] = useState([]);
  const [isConnected, setisConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [lotteryContract, setlotteryContract] = useState();
  const [web3, setWeb3] = useState()
  const [lotteryState, setlotteryState] = useState()

  useEffect(() => {
    const web3_temp = new Web3(INFURA_ENDPOINT)
    setWeb3(web3_temp)
    const lotteryContract = new web3_temp.eth.Contract(abi, LotteryContractAddress)
    setlotteryContract(lotteryContract)
    connectMetaMask()
    detectMetaMaskAccountChange();
    getRecentWinners(lotteryContract)
    getLotteryState(lotteryContract)
  }, []);

  async function detectMetaMaskAccountChange() {
    window.ethereum.on("accountsChanged", async function () {
      console.log('you changed the currently selected account')
      const web3 = new Web3(Web3.givenProvider);
      web3.eth.getAccounts().then(
        (response) => {
          setAccounts(response)
          if (!response[0]) {
            console.log('no account is connected')
            setisConnected(false)
          }
        }
      )

    });
  }

  function getRecentWinners(lotteryContract) {
    lotteryContract.methods.lottery_count().call().then((lotteryCount) => {
      const recentWinnerstemp = []
      var countTemp = lotteryCount
      var maxLotterycount = 5;
      // for (var maxLotterycount = 3; (lotteryCount > 0) && (maxLotterycount > 0); maxLotterycount--) {
      while ((lotteryCount > 0) && (maxLotterycount > 0)) {
        lotteryContract.methods.recentWinners(lotteryCount).call().then((response) => {
          recentWinnerstemp.push(response)
          countTemp--
          maxLotterycount--
          if (countTemp == 0 || maxLotterycount == 0) {
            console.log('Recent winners retrieved succesfully: ' + maxLotterycount + "|")
            // console.log()
            setrecentWinners(recentWinnerstemp)
          }
        }, (error) => {
          console.log(error)
          alert('There was an error retrieving recent winners')
        })
        console.log("current value: " + (lotteryCount > 0) && (maxLotterycount > 0))
        lotteryCount--
      }

    }, (error) => {
      console.log(error)
    })
  }
  function getLotteryState(lotteryContract) {
    lotteryContract.methods.lottery_state().call().then((response) => {

      switch (response) {
        case '0':
          setlotteryState("Ended/Not Started")
          break;
        case '1':
          setlotteryState("Ongoing")
          break;
        case '2':
          setlotteryState("Calculating winner, please wait")
          break;
        case '3':
          setlotteryState("Processing...")
          break;
        default:
          setlotteryState("Unknown!")
          break;
      }
    }, (error) => {
      console.log(error)
    })
  }

  function endLottery() {

    setlotteryState("Processing...")
    const web3 = new Web3(INFURA_ENDPOINT);
    const lotteryContract = new web3.eth.Contract(abi, LotteryContractAddress);
    const lotteryOwnerAddress = "0x281B3B65AE71fc4EBBa61325a6bC2974B80F04c2"
    var lotteryContractOwner = web3.eth.accounts.privateKeyToAccount('0x65cde2fe2e5f7c84d33f6e1b25585ff2469b5704d43e1c18a72b5b6978aef57a');

    web3.eth.getTransactionCount(lotteryOwnerAddress, async (err, txCount) => {
      const txObject = {
        nonce: txCount,
        to: LotteryContractAddress,
        gasLimit: 300000,
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        chainId: 4,
        data: lotteryContract.methods.endLottery().encodeABI()
      }

      const signedTx = await web3.eth.accounts.signTransaction(txObject, lotteryContractOwner.privateKey);

      console.log('attempting to send signed transaction')
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
          console.log("🎉 The hash of your transaction is: ", hash, "\n Check Infura's Mempool to view the status of your transaction!");
        } else {
          console.log("❗Something went wrong while submitting your transaction:", error)
        }
      }).then((response) => {
        setlotteryState("Ended/Not Started")
        console.log('this is the transaction receipt')
        console.log(response)
        getLotteryState(lotteryContract)
      },
        (error) => {
          console.log('this is the transaction error receipt')
          getLotteryState(lotteryContract)
          console.log(error)
        }
      )
    })

  }

  function startLottery() {
    setlotteryState("Processing...")
    const web3 = new Web3(INFURA_ENDPOINT);
    const lotteryContract = new web3.eth.Contract(abi, LotteryContractAddress);
    const lotteryOwnerAddress = "0x281B3B65AE71fc4EBBa61325a6bC2974B80F04c2"
    var lotteryContractOwner = web3.eth.accounts.privateKeyToAccount('0x65cde2fe2e5f7c84d33f6e1b25585ff2469b5704d43e1c18a72b5b6978aef57a');

    web3.eth.getTransactionCount(lotteryOwnerAddress, async (err, txCount) => {
      const txObject = {
        nonce: txCount,
        to: LotteryContractAddress,
        gasLimit: 300000,
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        chainId: 4,
        data: lotteryContract.methods.startLottery().encodeABI()
      }

      const signedTx = await web3.eth.accounts.signTransaction(txObject, lotteryContractOwner.privateKey);

      console.log('attempting to send signed transaction')
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
          console.log("🎉 The hash of your transaction is: ", hash, "\n Check Infura's Mempool to view the status of your transaction!");

        } else {
          console.log("❗Something went wrong while submitting your transaction:", error)
        }
      }).then((response) => {
        setlotteryState("Ongoing")
        console.log('this is the transaction receipt')
        console.log(response)
        getLotteryState(lotteryContract)

      },
        (error) => {
          console.log('this is the transaction error receipt')
          console.log(error)
          getLotteryState(lotteryContract)

        }
      )
    })
  }

  function enterLottery() {
    if (lotteryState != "Ongoing") {
      const cannotEnterLottery = ("Cannot enter lottery when it's " + lotteryState + " Please ") + ((lotteryState == "Ended/Not Started") ? "Click the blue start lottery button to start the lottery" : "wait a little for the previouse winner to be selected and then start a new lottery session")
      alert(cannotEnterLottery)
      // console.log(cannotEnterLottery)
      return;
    }
    const web3 = new Web3(Web3.givenProvider);
    const lotteryContract = new web3.eth.Contract(abi, LotteryContractAddress);
    lotteryContract.methods.entranceFeeInWei().call().then((response) => {
      lotteryContract.methods.enter().send({ from: accounts[0], value: response * 1.05 }).then(
        (response) => {
          console.log('Entered lottery succesfully')
        },
        (errorii) => {
          console.log('An error occured while attempting to enter lottery')
          console.log(errorii)
        }
      )
    },
      (error) => {
        console.log('error retrieving the entrance fee in wei' + error)
      })

  }

  const connectMetaMask = async () => {
    console.log("attempting to connect metamask")
    if (window.ethereum) {
      try {
        Web3.givenProvider.send('eth_requestAccounts')
          .then((response) => {
            setAccounts(response.result)
            setisConnected(true)
            return true;
          });
      } catch (error) {
        console.log('There was an error connecting to metamask')
        return false;
      }
    }
  }

  return (
    <div>
      <Menu id={"Home"} />
      <Header account={accounts[0]} endLottery={endLottery} startLottery={startLottery} enterLottery={enterLottery} connectMetaMask={connectMetaMask} isConnected={isConnected} lotteryState={lotteryState} />
      <table>
        <RecentWinners recentWinners={recentWinners} />
      </table>
      <HowItWorks />
      <Faqs />
    </div>
  );
}

export default App;
