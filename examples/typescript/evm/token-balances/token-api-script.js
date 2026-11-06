// Usage: pnpm tsx evm/token-balances/token-api-script.js

import { CdpClient } from "@coinbase/cdp-sdk";
import "dotenv/config";

const cdp = new CdpClient();
const address = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
const contractAddress = "0x607f4c5bb672230e8672085532f7e901544a7375";

let pageToken;
let tokenBalance;

do {
  const result = await cdp.evm.listTokenBalances({
    address,
    network: "ethereum",
    pageToken,
  });

  tokenBalance = result.balances.find(
    balance => balance.token.contractAddress.toLowerCase() === contractAddress.toLowerCase(),
  );
  pageToken = result.nextPageToken;
} while (!tokenBalance && pageToken);

if (tokenBalance) {
  console.log("TOKEN BALANCE->");
  console.log({
    contractAddress: tokenBalance.token.contractAddress,
    amount: tokenBalance.amount.amount.toString(),
    decimals: tokenBalance.amount.decimals,
  });
  console.log("TOKEN METADATA->");
  console.log({
    network: tokenBalance.token.network,
    name: tokenBalance.token.name,
    symbol: tokenBalance.token.symbol,
  });
} else {
  console.log(`No balance returned for token ${contractAddress} on ethereum.`);
}
