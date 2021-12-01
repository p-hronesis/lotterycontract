import { useContractFunction } from "@usedapp/core";
import { Contract, utils } from "ethers";
// import lotteryContract from "./App.js"
import lotteryContractAbi from "./abi/lottery.json"


const lotteryContractAddress = "0x61fc507e6e2f41fb207c6fd21ed54cf8caf6ecf9"
const lotteryInterface = new utils.Interface(lotteryContractAbi)
const lotteryContract = new Contract(lotteryContractAddress, lotteryInterface)
export function UseContractMethod(methodName) {
    const { state, send } = useContractFunction(lotteryContract, methodName, {});
    return { state, send };
}

