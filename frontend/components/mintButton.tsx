import React, { useState } from 'react';
import { 
  Button, 
  useToast,
  Box,
  Stack
} from "@chakra-ui/react";
import { createMintClient } from "@zoralabs/protocol-sdk";
import type { Address, WalletClient } from "viem";
import { createPublicClient, createWalletClient, http } from "viem";
import { useWalletClient } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';

// helper to ensure that an eth address starts with '0x'
function ensureAddressFormat(address: string) {
  if (!address.startsWith('0x')) {
    return `0x${address}`;
  }
  return address;
}

// handle the nft minting process
async function mintNFT(
  walletClient: WalletClient,
  address: Address,
  tokenID: bigint,
  quantityToMint: number,
  mintReferralAddress: string
) {
  // error things: ensure that the wallet client has a valid chain selected
  if (!walletClient.chain) {
    throw new Error("Chain is undefined");
  }

  // set up minting api and client configs
  const mintAPI = createMintClient({ chain: walletClient.chain });
  const publicClient = createPublicClient({
    chain: walletClient.chain,
    transport: http(),
  });

  // make parameters for the minting api request
  const mintableParams = new URLSearchParams({
    tokenId: `${tokenID}`,
    collectionAddress: address,
    chainName: mintAPI.network.zoraBackendChainName,
  }).toString();

  // fetching mintable data
  const result = await fetch(`/api/mintable?${mintableParams}`)
  const mintable = await result.json();

  // prepare mint token parameters
  const params = await mintAPI.makePrepareMintTokenParams({
    mintable,
    publicClient,
    minterAccount: walletClient.account!.address,
    mintArguments: {
      mintToAddress: walletClient.account!.address,
      quantityToMint: quantityToMint,
      mintComment: "",
      mintReferral: mintReferralAddress as `0x${string}`,
    },
  });

  // simulate the mint
  const simulatedMinted = await publicClient.simulateContract(
    params.simulateContractParameters
  );

  // send the mint transaction
  const hash = await walletClient.writeContract(simulatedMinted.request);

  // waiting on the transaction and the receipt
  return await publicClient.waitForTransactionReceipt({ hash });
}
interface MintButtonProps {
  contractAddress: string;
  tokenId: string;
}

function MintButton({ contractAddress, tokenId }: MintButtonProps) {
  // converting input contract address and tokenId 
  const address: Address = contractAddress as Address;
  const tokenBigInt = BigInt(tokenId);

  const walletClient = useWalletClient();
  const { openConnectModal } = useConnectModal();

  // check if the wallet is connected
  const isWalletConnected = walletClient?.data !== undefined;
  const [isMinting, setIsMinting] = useState(false);
  const toast = useToast();

  // quantity things
  const [quantityToMint, setQuantityToMint] = useState(1);
  const mintCostPerNFT = 0.000777;

  // quantity button things
  const incrementQuantity = () => {
    setQuantityToMint(q => q + 1);
  };

  const decrementQuantity = () => {
    setQuantityToMint(q => Math.max(1, q - 1));
  };

  // using my address for testing
  const mintReferralAddress = "0x4B921B8AFDc9cCFc7297Bbe6c3a7eACe7dA93D92";

  const handleMint = async () => {
    // check if the wallet is connected before minting
    if (walletClient?.data) {
      setIsMinting(true); // minting started
      try {
        const formattedMintReferralAddress = ensureAddressFormat(mintReferralAddress) as `0x${string}`;
        await mintNFT(walletClient.data, address, tokenBigInt, quantityToMint, formattedMintReferralAddress);
        
        // success toast
        toast({
          title: "Success",
          description: "NFT minted successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } catch (error) {
        let errorMessage = "Something went wrong. Please try again.";
        let errorTitle = "Error";        
        
      // handle rejected transactions
      if (error instanceof Error && error.message.includes("User denied transaction signature")) {
        errorMessage = "Transaction rejected by user.";
        errorTitle = "Transaction Rejected";
      }

      // error toast 
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      } finally {
        setIsMinting(false); // minting done
      }
    } else {
      // open wallet connect modal if the wallet is not connected
      if (openConnectModal) {
        openConnectModal();
      } else {
        // if openConnectModal is undefined
        console.error("Wallet connection functionality is unavailable.");
        toast({
          title: "Error",
          description: "Unable to connect to the wallet. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };  

  return (
    <Box>
      {!isWalletConnected && (
        <Stack mt={4} align="center" justifyContent="center" direction='row'>
          <Button onClick={openConnectModal} pb={1}>
            CONNECT YOUR WALLET
          </Button>
        </Stack>
      )}

      {isWalletConnected && (
        <>
        <Stack mt={4} align="center" justifyContent="center" direction='row'>
          <Button onClick={decrementQuantity} pb={2}>-</Button>
          <Box w="50px" textAlign='center'>
            {quantityToMint}
          </Box>
          <Button onClick={incrementQuantity} pb={2}>+</Button>
          <Button onClick={handleMint} disabled={isMinting} pb={1}>
            {isWalletConnected ? (isMinting ? "MINTING..." : "MINT") : "CONNECT WALLET"}
            <Box fontSize="md" ml={1} mt={1}>{quantityToMint * mintCostPerNFT} eth</Box>
          </Button>
        </Stack>
        </>
      )}
    </Box>
  );
}

export default MintButton;