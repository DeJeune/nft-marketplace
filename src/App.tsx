import { QueryClient,  QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import ListNFT from './components/ListNFT';
import DisplayNFTs from './components/DisplayNFT';
import './App.css'
import { abi, tokenAbi } from './config/abi'
import { WagmiProvider } from 'wagmi';
import { http } from '@wagmi/core'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
  base,
} from 'wagmi/chains';
import BuyNFT from './components/BuyNFT';
import Token from './components/Token';
import { useEffect, useState } from 'react';

const marketplaceAddress = '0x3236e0366dd8b9cdcbea8b9296274d314ae48e53'
const nftAddress = '0x6e25dE4199624976152618db4832aDA30C66EC59'
const tokenAddress = '0x6B78b3F4be41D60b2c251391c71B5f6bE3a32767'
const marketplaceAbi = abi
const queryClient = new QueryClient()
const rpcUrl = 'https://sepolia.drpc.org'

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(rpcUrl),
  },

});

const App: React.FC = () => {
  const [nfts, setNfts] = useState<{ contractAddress: string; tokenId: string; }[]>([]);

   // Load nfts from localStorage on component mount
   useEffect(() => {
    const storedNfts = localStorage.getItem('nfts');
    if (storedNfts) {
      setNfts(JSON.parse(storedNfts));
    }
  }, []);

  // Save nfts to localStorage whenever nfts state changes
  useEffect(() => {
    localStorage.setItem('nfts', JSON.stringify(nfts));
  }, [nfts]);
  console.log(nfts)

  const handleListNFT = (nft: { contractAddress: string; tokenId: string;}) => {
    setNfts((prevNfts) => [...prevNfts, nft]);
  };
  return (
    <div className="container mx-auto p-4">
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
      <ConnectButton />
      <Token tokenAddress={ tokenAddress} tokenAbi={tokenAbi} />
      <ListNFT marketplaceAddress={marketplaceAddress} abi={marketplaceAbi} onList={handleListNFT} />
      <DisplayNFTs nfts={nfts} abi={marketplaceAbi} marketplaceAddress={marketplaceAddress} />
      <BuyNFT marketplaceAddress={marketplaceAddress} abi={marketplaceAbi} contractAddress={nftAddress} tokenId='1'/>
      </RainbowKitProvider>
      </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default App;
