import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected} from '@wagmi/connectors';

const ConnectWallet: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect} = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      await connect({ connector: injected() });
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return (
    <div className="p-4">
      {isConnected ? (
        <div>
          <p className="text-green-600">Connected as: {address}</p>
          <button
            onClick={() => disconnect()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;