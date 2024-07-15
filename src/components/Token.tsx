import { useReadContract, useAccount,type BaseError } from 'wagmi';
import { Abi, Address } from 'viem';

interface TokenProps {
  tokenAddress: Address;
  tokenAbi: Abi; 
}

function ReadContract(tokenAddress: Address, tokenAbi: Abi, address: Address) {
    const { data: balance, error,
        isPending } = useReadContract({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: 'balanceOf',
      args: [address],
    })
    if (isPending) return <div>Loading...</div>

  if (error)
    return (
      <div>
        Error: {(error as unknown as BaseError).shortMessage || error.message}
      </div>
    )
  
    return (
      <div className="bg-blue-500 text-white px-4 py-2 rounded">Balance: {balance?.toString()}</div>
    )
  }

const Token: React.FC<TokenProps> = ({ tokenAddress, tokenAbi }) => {
    const { address } = useAccount();
    if (!address) {
        return <div>Please connect your wallet.</div>;
      }
    
    return ReadContract(tokenAddress, tokenAbi, address);
};
  

export default Token;
