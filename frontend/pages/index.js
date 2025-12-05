import { CONTRACT_ADDRESS } from "../constants";
import ContractABI from "../constants/Ecommerce.json";
import MainLayout from "../layouts/MainLayout";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Card1 from "../subcomponents/card/Card1";
import Categories from "../components/categories/Categories";
import { Typography } from "@material-tailwind/react";

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

export default function Home({
  AllData,
  MobileData,
  FashionData,
  ElectronicData,
  LaptopData,
  CameraData,
  ToysData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  useEffect(() => {
    switch (selectedCategory) {
      case "all":
        setSelectedCategoryData(AllData);
        break;
        case "mobile":
          setSelectedCategoryData(MobileData);
          break;
          case "fashion":
            setSelectedCategoryData(FashionData);
        break;
      case "electronics":
        setSelectedCategoryData(ElectronicData);
        break;
      case "laptop":
        setSelectedCategoryData(LaptopData);
        break;
      case "camera":
        setSelectedCategoryData(CameraData);
        break;
      case "toys":
        setSelectedCategoryData(ToysData);
        break;
      default:
        setSelectedCategoryData(AllData);
        break;
      
    }
  }, [selectedCategory]);

  return (
    <MainLayout>
      <Categories setSelectedCategory={setSelectedCategory} />
      <Typography className="mt-4" variant="h3">{selectedCategory.toUpperCase()}</Typography>
      <div className="flex mt-10 flex-wrap items-center gap-10">
        {selectedCategoryData.length
          ? selectedCategoryData.map((item, index) => (
              <Card1
                key={index}
                selectedCategory={selectedCategory}
                metadata={item.metadata}
                price={item.price}
                publishedDate={item.timeStamp}
                productId={item.productId}
              />
            ))
          : !selectedCategoryData.length && !isLoading
          ? "No Product Found"
          : "Loading..."}
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  try {
    const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
    if (!RPC_URL || !CONTRACT_ADDRESS) {
      throw new Error('Missing RPC_URL or CONTRACT_ADDRESS. Please check your .env.local file.');
    }
    
    // Validate contract address format
    if (!ethers.utils.isAddress(CONTRACT_ADDRESS) || CONTRACT_ADDRESS.includes('YourDeployed') || CONTRACT_ADDRESS.includes('Deployer')) {
      throw new Error(`Invalid contract address: "${CONTRACT_ADDRESS}". Please deploy your contract and update .env.local with the real address.`);
    }
    
    const provider = createProvider(RPC_URL);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractABI.abi,
    provider
  );

  const getEventData = async (category) => {
    const getAllProducts = contract.filters.productAdded(category);
    const AllProducts = await contract.queryFilter(getAllProducts);
    const mappedData = AllProducts.map((e) => {
      const args = e.args;
      return {
        metadata: args._metadata,
        productId: parseInt(args._productId),
        price: ethers.utils.formatEther(args._price),
        timeStamp: parseInt(args._timestamp),
      };
    });
    return mappedData;
  };

    const AllData = await getEventData(null);
    const MobileData = await getEventData("mobile");
    const FashionData = await getEventData("fashion");
    const ElectronicData = await getEventData("electronics");
    const LaptopData = await getEventData("laptop");
    const CameraData = await getEventData("camera");
    const ToysData = await getEventData("toys");

    return {
      props: {
        AllData,
        MobileData,
        FashionData,
        ElectronicData,
        LaptopData,
        CameraData,
        ToysData,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // Return empty data if there's an error (e.g., contract not deployed yet)
    return {
      props: {
        AllData: [],
        MobileData: [],
        FashionData: [],
        ElectronicData: [],
        LaptopData: [],
        CameraData: [],
        ToysData: [],
      },
    };
  }
}
