import { ethers } from 'ethers';
import type { Dispatch } from 'react';
import { clientEnv } from '../../../env/schema.mjs';
import { actions } from '../state';
import getAccount from './getAccount';
import getProvider from './getProvider';
import artifacts from '../../../../artifacts/contracts/Event.sol/Event.json'

const connectWallet = (dispatch: Dispatch<Action>): Promise<void> => {
    const init = async () => {
        const provider = getProvider();
        const account = await getAccount(provider);
        const networkID = await provider.getNetwork();
        const signer = provider.getSigner();

        if (typeof clientEnv.NEXT_PUBLIC_EVENT_ADDRESS == 'undefined') return
        const eventContract = new ethers.Contract(clientEnv.NEXT_PUBLIC_EVENT_ADDRESS, artifacts.abi, signer);

        let wsProvider = null;
        let eventWsContract = null;

        switch (networkID.chainId) {
            case 31337:
                wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545/');
                break;
            case 5:
                wsProvider = new ethers.providers.WebSocketProvider(
                    `wss://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_GOERLI_WS_KEY}`,
                );
                break;
            default:
                break;
        }

        if (wsProvider) {
            eventWsContract = new ethers.Contract(clientEnv.NEXT_PUBLIC_EVENT_ADDRESS, artifacts.abi, wsProvider);
        }

        dispatch({
            type: actions.connect,
            payload: {
                provider,
                wsProvider,
                signer,
                account,
                networkID,
                eventContract,
                eventWsContract
            },
        });
    };

    return init();
};

export default connectWallet;
