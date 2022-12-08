
declare interface Window {
  ethereum: any;
}

declare type Action = {
  type: string;
  payload?: any;
};

declare type EthContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

declare type State = {
  provider: ethers.providers.Web3Provider | null;
  wsProvider: ethers.providers.WebSocketProvider | null;
  signer: ethers.Signer | null;
  account: string | null;
  networkID: ethers.providers.Network | null;
  eventContract: ethers.Contract,
  eventWsContract: ethers.Contract
};
