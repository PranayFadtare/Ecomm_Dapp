import { Button } from "@material-tailwind/react";
import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import ProductDetail from "../components/product-details/ProductDetail";
import { CONTRACT_ADDRESS, urls } from "../constants";
import ContractABI from "../constants/Ecommerce.json";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

// Helper function to create provider that disables ENS for local networks
function createProvider(RPC_URL) {
  const isLocalNetwork = RPC_URL?.includes('127.0.0.1') || RPC_URL?.includes('localhost');
  
  if (isLocalNetwork) {
    try {
      // Create a custom network object that explicitly disables ENS
      const network = {
        chainId: 31337,
        name: 'hardhat',
        ensAddress: null,
        _defaultProvider: null
      };
      
      const provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL, network);
      
      // Override resolveName to completely disable ENS resolution
      provider.resolveName = async (name) => {
        // If it looks like an address, return it directly
        if (ethers.utils.isAddress(name)) {
          return name;
        }
        // Otherwise, return null to prevent ENS resolution
        return null;
      };
      
      // Override _getResolver to prevent ENS resolver lookup
      if (provider._getResolver) {
        provider._getResolver = async () => {
          throw new Error('ENS not supported on local network');
        };
      }
      
      // Prevent network detection that triggers ENS
      if (provider.detectNetwork) {
        const originalDetectNetwork = provider.detectNetwork.bind(provider);
        provider.detectNetwork = async () => {
          return network;
        };
      }
      
      return provider;
    } catch (error) {
      // If provider creation fails, create a minimal provider
      console.warn('Provider creation warning:', error.message);
      const network = { chainId: 31337, name: 'hardhat', ensAddress: null };
      return new ethers.providers.StaticJsonRpcProvider(RPC_URL, network);
    }
  } else {
    return new ethers.providers.JsonRpcProvider(RPC_URL);
  }
}

export default function Productid({ ProductIdData }) {
  const router = useRouter();
  const { accountAddress, requestContract } = useContext(MainContext);
  const [quantityInput, setQuantityInput] = useState("");
  const [open, setOpen] = useState(false);

  const transferFund = async () => {
    try {
      toast.info("Wait...");
      const contract = await requestContract();

      const transaction = await contract.buyProduct(ProductIdData.productId, {
        value: ethers.utils.parseEther(ProductIdData.price),
      });
      toast.promise(transaction.wait(), {
        pending: "Wait...",
        success: "Product Bought Successfully! 👌",
        error: "Some Error Occured. 🤯",
      });
      await transaction.wait();
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured. 🤯");
    }
  };

  const updateProductByAdmin = async () => {
    try {
      if (!quantityInput) {
        toast.error("Enter Quantity Value...");
        return;
      }
      setOpen(false);
      toast.info("Wait...");

      const contract = await requestContract();
      const tx = await contract.updateQuantity(
        quantityInput,
        ProductIdData.productId
      );
      toast.promise(tx.wait(), {
        pending: "Wait...",
        success: "Product Quantity Updated Successfully! 👌",
        error: "Some Error Occured. 🤯",
      });
      await tx.wait();
      setQuantityInput("");
      router.push(urls.pastOrders);
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured. Please try again 🤯");
    }
  };

  return (
    <MainLayout>
      <ToastContainer autoClose={2500} />
      <ProductDetail
        open={open}
        setOpen={setOpen}
        updateProduct={updateProductByAdmin}
        quantityInput={quantityInput}
        setQuantityInput={setQuantityInput}
        productId={ProductIdData?.productId}
        metadata={ProductIdData?.metadata}
        price={ProductIdData?.price}
        quantity={ProductIdData?.quantity}
      >
        {accountAddress ? (
          <>
            <Button
              onClick={() => transferFund()}
              className="flex items-center justify-center text-base gap-x-2 bg-primary"
              fullWidth
              disabled={!accountAddress}
            >
              Buy Now
              <AiOutlineArrowRight className="text-2xl" />
            </Button>
          </>
        ) : (
          "Connect Wallet to Buy"
        )}
      </ProductDetail>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  try {
    const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
    if (!RPC_URL || !CONTRACT_ADDRESS) {
      console.warn('Missing RPC_URL or CONTRACT_ADDRESS. Please check your .env.local file.');
      return {
        paths: [],
        fallback: "blocking",
      };
    }
    
    // Validate contract address format
    if (!ethers.utils.isAddress(CONTRACT_ADDRESS) || CONTRACT_ADDRESS.includes('YourDeployed') || CONTRACT_ADDRESS.includes('Deployer')) {
      console.warn(`Invalid contract address: "${CONTRACT_ADDRESS}". Please deploy your contract and update .env.local.`);
      return {
        paths: [],
        fallback: "blocking",
      };
    }
    
    const provider = createProvider(RPC_URL);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractABI.abi,
    provider
  );

    const getAllProducts = contract.filters.productAdded();
    const AllProducts = await contract.queryFilter(getAllProducts);

    return {
      paths: AllProducts.map((e) => ({
        params: {
          productid: e.args._productId.toString(),
        },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps(context) {
  try {
    const productId = parseInt(context.params.productid);
    const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
    if (!RPC_URL || !CONTRACT_ADDRESS) {
      console.warn('Missing RPC_URL or CONTRACT_ADDRESS. Please check your .env.local file.');
      return {
        notFound: true,
      };
    }
    
    // Validate contract address format
    if (!ethers.utils.isAddress(CONTRACT_ADDRESS) || CONTRACT_ADDRESS.includes('YourDeployed') || CONTRACT_ADDRESS.includes('Deployer')) {
      console.warn(`Invalid contract address: "${CONTRACT_ADDRESS}". Please deploy your contract and update .env.local.`);
      return {
        notFound: true,
      };
    }
    
    const provider = createProvider(RPC_URL);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractABI.abi,
    provider
  );

    const ProductData = await contract.getProduct(productId);
    const ProductIdData = {
      productId: parseInt(productId),
      price: ethers.utils.formatEther(ProductData.price),
      quantity: parseInt(ProductData.quantity),
      metadata: ProductData.metadata,
    };

    return {
      props: {
        ProductIdData,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
}
