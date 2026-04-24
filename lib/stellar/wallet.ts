import freighter from "@stellar/freighter-api";
const { isConnected, getAddress, signTransaction, setAllowed } = freighter;

/**
 * Connects the Freighter wallet and returns the public key.
 * @returns {Promise<string>} Public key of the connected wallet.
 */
export async function connectWallet(): Promise<string> {
  const { isConnected: connected } = await isConnected();
  if (!connected) {
    throw new Error("Freighter wallet not installed or disconnected.");
  }

  await setAllowed(); // Explicitly request connection permission
  const { address: publicKey } = await getAddress();
  if (!publicKey) {
    throw new Error("Failed to retrieve public key from Freighter.");
  }

  return publicKey;
}

/**
 * Retrieves the current wallet address if connected.
 * @returns {Promise<string | null>} Public key or null.
 */
export async function getWalletAddress(): Promise<string | null> {
  try {
    const { isConnected: connected } = await isConnected();
    if (!connected) return null;
    const { address } = await getAddress();
    return address;
  } catch (err) {
    return null;
  }
}

/**
 * Signs an XDR transaction string using Freighter.
 * @param {string} xdr The transaction XDR to sign.
 * @returns {Promise<string>} Signed XDR.
 */
export async function signTx(xdr: string): Promise<string> {
  try {
    const { signedTxXdr } = await signTransaction(xdr, {
      networkPassphrase: "TESTNET",
    });
    return signedTxXdr;
  } catch (err) {
    throw new Error("Transaction signing cancelled or failed.");
  }
}

/**
 * Checks if the wallet is currently connected.
 */
export async function checkConnection(): Promise<boolean> {
  const { isConnected: connected } = await isConnected();
  return connected;
}
