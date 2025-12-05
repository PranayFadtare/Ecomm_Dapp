import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import { MainContext } from "../../context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  hardhat: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "Hardhat Local",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545"],
    blockExplorerUrls: [""],
  },
};

export default function WalletConnect() {
  const {accountAddress, setAccountAddress} = useContext(MainContext)
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);

  // Check if MetaMask is installed
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMetaMaskInstalled(!!window.ethereum);
      
      // Also check for MetaMask specifically
      if (window.ethereum && window.ethereum.isMetaMask) {
        console.log("✅ MetaMask detected!");
      } else if (window.ethereum) {
        console.log("⚠️ Ethereum provider found but might not be MetaMask");
      } else {
        console.log("❌ MetaMask not detected");
      }
    }
  }, []);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    if (window.ethereum) {
      // Listen for account changes
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
          connectWallet();
        } else {
          setAccountAddress("");
          setBalance("");
          localStorage.removeItem("injected");
          console.log("Disconnected");
        }
      };

      // Listen for chain changes
      const handleChainChanged = () => {
        // Reload page when chain changes
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      // Auto-connect if previously connected
      if (localStorage.getItem("injected")) {
        connectWallet();
      }

      // Cleanup listeners on unmount
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window === "undefined") {
        toast.error("This feature only works in a browser.");
        setLoading(false);
        return;
      }

      if (!window.ethereum) {
        toast.error(
          <div>
            <p>MetaMask is not detected!</p>
            <p style={{ fontSize: '12px', marginTop: '5px' }}>
              Please: 1) Install MetaMask 2) Refresh page 3) Make sure it's enabled
            </p>
          </div>,
          { autoClose: 5000 }
        );
        setLoading(false);
        return;
      }

      // Additional check for MetaMask
      if (!window.ethereum.isMetaMask) {
        console.warn("Ethereum provider found but might not be MetaMask");
      }

      setLoading(true);
      
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      
      // Get current network
      const network = await provider.getNetwork();
      const isLocalNetwork = network.chainId === 31337 || network.name === 'hardhat' || network.name === 'localhost';
      
      // If not on local network, try to switch/add network
      if (!isLocalNetwork) {
        try {
          // Try to switch to Hardhat local network first
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${Number(31337).toString(16)}` }],
          });
        } catch (switchError) {
          // If network doesn't exist, add it
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [networks.hardhat],
              });
            } catch (addError) {
              console.log("Error adding network:", addError);
              // If adding fails, try Polygon as fallback
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [networks.polygon],
                });
              } catch (polygonError) {
                console.log("Error adding Polygon network:", polygonError);
                toast.warning("Could not switch network. Please manually switch to Hardhat Local (Chain ID: 31337) in MetaMask.");
              }
            }
          } else {
            console.log("Error switching network:", switchError);
          }
        }
      }
      
      // Get account and balance
      const signer = provider.getSigner();
      const Address = await signer.getAddress();
      setAccountAddress(Address);
      
      try {
        const balance = await signer.getBalance();
        const Balance = ethers.utils.formatEther(balance);
        setBalance(Balance);
      } catch (balanceError) {
        console.log("Error getting balance:", balanceError);
        setBalance("0.0");
      }
      
      localStorage.setItem("injected", "web3");
      toast.success("Wallet connected successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error while connecting wallet:", error);
      
      // Provide more specific error messages
      if (error.code === 4001) {
        toast.error("Connection rejected. Please approve the connection in MetaMask.");
      } else if (error.code === -32002) {
        toast.error("Connection request already pending. Please check MetaMask.");
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
        console.error("Full error:", error);
      } else {
        toast.error("Error connecting wallet. Please check console for details.");
        console.error("Connection error:", error);
      }
    }
  };

  return (
    <div>
      <ToastContainer autoClose={2500} />
      {accountAddress && accountAddress.length > 2 ? (
        <div className="bg-slate-200 py-2.5 rounded-2xl pl-4 cursor-pointer">
          <span className="text-black">
            {accountAddress.slice(0, 6)}...{accountAddress.slice(accountAddress.length - 4)}
          </span>
          <span className="bg-primary py-2.5 ml-4 px-3 rounded-2xl text-white">
            {balance ? `${parseFloat(balance).toFixed(4)} ETH` : "0.0 ETH"}
          </span>
        </div>
      ) : (
        <div>
          {!metaMaskInstalled && (
            <div className="mb-2 text-xs text-red-500">
              ⚠️ MetaMask not detected. Please install and refresh page.
            </div>
          )}
          <Button 
            disabled={loading || !metaMaskInstalled} 
            className="flex items-center justify-center gap-x-2 bg-primary" 
            onClick={connectWallet}
          >
             <AiOutlinePlus className="text-xl text-white" />
             {loading ? "Connecting..." : "Connect Wallet"}
          </Button>
          {!metaMaskInstalled && (
            <div className="mt-2 text-xs text-blue-500">
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                Download MetaMask →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
