import React from 'react';
import { useWriteContract } from 'wagmi';
import { Abi, Address } from 'viem';

interface BuyNFTProps {
  marketplaceAddress: Address;
  abi: Abi;
  contractAddress: string;
  tokenId: string;
}

const BuyNFT: React.FC<BuyNFTProps> = ({ marketplaceAddress, abi, contractAddress, tokenId}) => {
    const { writeContract } = useWriteContract();
  return (
    <button
      onClick={() => writeContract({
        address: marketplaceAddress,
        abi: abi,
        functionName: 'buyNFT',
        args: [contractAddress, tokenId],
      })}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Buy NFT
    </button>
  );
};

export default BuyNFT;
