import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { ethers } from 'ethers';
import { Abi, Address } from 'viem';

interface ListNFTProps {
  marketplaceAddress: Address;
  abi: Abi; 
  onList: (nft: { contractAddress: string; tokenId: string; }) => void;
}

const ListNFT: React.FC<ListNFTProps> = ({ marketplaceAddress, abi, onList }) => {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');

  const { writeContract } = useWriteContract();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    writeContract({
        address: marketplaceAddress,
        abi: abi,
        functionName: 'listNFT',
        args: [contractAddress, tokenId, price],
      });
    onList({ contractAddress, tokenId });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="NFT Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Price (in ERC20)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        List NFT
      </button>
    </form>
  );
};

export default ListNFT;
