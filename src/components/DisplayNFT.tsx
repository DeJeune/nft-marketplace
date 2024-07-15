import React, { useEffect, useState } from 'react';
import { useReadContracts } from 'wagmi';
// import { watchContractEvent } from '@wagmi/core';
// import { ethers } from 'ethers';
import { Abi, Address } from 'viem';
// import { config } from '../config/config.tsx'

interface DisplayNFTsProps {
  nfts: { contractAddress: string; tokenId: string; }[]
  marketplaceAddress: Address;
  abi: Abi;
}

interface Contract {
  address: Address,
  abi: Abi,
  functionName: string,
  args: string[],
}

interface NFT {
  seller: Address;
  contractAddress: Address;
  tokenId: number;
  price: number;
  isActivate: boolean; 
}


const DisplayNFTs: React.FC<DisplayNFTsProps> = ({ nfts, abi, marketplaceAddress }) => {
  const [NFTs, setNFTs] = useState<NFT[]>([]);
  const contracts: Contract[] = [];

  // 构建合约调用参数
  for (let index = 0; index < nfts.length; index++) {
    const { contractAddress, tokenId } = nfts[index];
    contracts.push({ address: marketplaceAddress, abi: abi, functionName: "listings", args: [contractAddress, tokenId] });
  }
  console.log(contracts)

  // 使用 useReadContracts 获取数据
  const { data } = useReadContracts({ contracts: contracts });
  console.log(data)

  useEffect(() => {
    if (data !== undefined && data != null) {
      const detailedNFTs: NFT[] = [];

      data.forEach(item => {
        if (item.status === 'success') {
          detailedNFTs.push(item.result as NFT);
        } else {
          console.error(item.error);
        }
      });

      // 更新状态
      setNFTs(detailedNFTs);
    }
  }, [data]); // useEffect 依赖于 data 的变化

  return (
    <div className="p-4">
      {NFTs.map((nft, index) => (
        <div key={index} className="border p-4 mb-4">
          <p>Contract Address: {nft.contractAddress}</p>
          <p>Token ID: {nft.tokenId}</p>
          <p>Price: {nft.price} ERC20</p>
          <p>Seller: {nft.seller}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayNFTs;