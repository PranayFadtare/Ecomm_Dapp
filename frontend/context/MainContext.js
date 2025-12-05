import { ethers } from "ethers";
import { createContext, useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_OWNER_ADDRESS } from "../constants";
import ContractABI from "../constants/Ecommerce.json";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState("");
  const [currentBlock, setCurrentBlock] = useState(0)

  const isAdmin = () => {
    if(!accountAddress) return false;
    if(CONTRACT_OWNER_ADDRESS === accountAddress){
        return true;
    }else{
        return false;
    }
  }

  const requestContract = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    
    // Get the network to check if it's local Hardhat
    const network = await provider.getNetwork();
    const isLocalNetwork = network.chainId === 31337 || network.name === 'hardhat' || network.name === 'localhost';
    
    // Override resolveName to prevent ENS resolution on local networks
    if (isLocalNetwork) {
      provider.resolveName = async (name) => {
        // If it looks like an address, return it directly
        if (ethers.utils.isAddress(name)) {
          return name;
        }
        // Otherwise, return null to prevent ENS resolution
        return null;
      };
    }
    
    const signer = provider.getSigner();
  
    // Validate contract address before creating contract
    if (!CONTRACT_ADDRESS || !ethers.utils.isAddress(CONTRACT_ADDRESS)) {
      throw new Error('Invalid contract address. Please check your .env.local file.');
    }
    
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ContractABI.abi,
      signer
    );
    const blockNumber = await provider.getBlockNumber();
    setCurrentBlock(blockNumber)

    return contract;
  }

  return (
    <MainContext.Provider
      value={{
        accountAddress,
        currentBlock,
        setAccountAddress,
        isAdmin,
        requestContract
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
