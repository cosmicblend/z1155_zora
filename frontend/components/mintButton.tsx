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

function ensureAddressFormat(address: string) {
  if (!address.startsWith('0x')) {
    return `0x${address}`;
  }
  return address;
}

async function mintNFT(
  walletClient: WalletClient,
  address: Address,
  tokenID: bigint,
  quantityToMint: number,
  mintReferralAddress: string
) {
  if (!walletClient.chain) {
    throw new Error("Chain is undefined");
  }

  const mintAPI = createMintClient({ chain: walletClient.chain });
  const publicClient = createPublicClient({
    chain: walletClient.chain,
    transport: http(),
  });
  const mintableParams = new URLSearchParams({
    tokenId: `${tokenID}`,
    collectionAddress: address,
    chainName: mintAPI.network.zoraBackendChainName,
  }).toString();
  const result = await fetch(`/api/mintable?${mintableParams}`)
  const mintable = await result.json();
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
  const simulatedMinted = await publicClient.simulateContract(
    params.simulateContractParameters
  );
  const hash = await walletClient.writeContract(simulatedMinted.request);
  return await publicClient.waitForTransactionReceipt({ hash });
}
interface MintButtonProps {
  contractAddress: string;
  tokenId: string;
}

function MintButton({ contractAddress, tokenId }: MintButtonProps) {
  //const address = contractAddress;
  const address: Address = contractAddress as Address;
  //const tokenId = BigInt(1);
  const tokenBigInt = BigInt(tokenId);
  const walletClient = useWalletClient();
  const { openConnectModal } = useConnectModal();
  const isWalletConnected = walletClient?.data !== undefined;
  const [isMinting, setIsMinting] = useState(false);
  const toast = useToast();

  // quantity things
  const [quantityToMint, setQuantityToMint] = useState(1);
  const mintCostPerNFT = 0.000777;

  const incrementQuantity = () => {
    setQuantityToMint(q => q + 1);
  };

  const decrementQuantity = () => {
    setQuantityToMint(q => Math.max(1, q - 1));
  };

  const mintReferralAddress = "0x4B921B8AFDc9cCFc7297Bbe6c3a7eACe7dA93D92";

  const handleMint = async () => {
    if (walletClient?.data) {
      setIsMinting(true); // Start minting
      try {
        const formattedMintReferralAddress = ensureAddressFormat(mintReferralAddress) as `0x${string}`;
        await mintNFT(walletClient.data, address, tokenBigInt, quantityToMint, formattedMintReferralAddress);
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
        
      // Check for a transaction rejection error
      if (error instanceof Error && error.message.includes("User denied transaction signature")) {
        errorMessage = "Transaction rejected by user.";
        errorTitle = "Transaction Rejected";
      }
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      } finally {
        setIsMinting(false); // End minting
      }
    } else {
      if (openConnectModal) {
        openConnectModal();
      } else {
        // Handle the case where openConnectModal is undefined
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