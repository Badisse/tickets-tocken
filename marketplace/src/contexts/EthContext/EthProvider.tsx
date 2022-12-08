import type { ReactNode} from 'react';
import { useEffect } from 'react';
import React, { useReducer, useMemo } from 'react';
import EthContext from './EthContext';
import { reducer, initialState } from './state';
import connectWallet from './utils/connectWallet';

type Props = {
    children: ReactNode;
};

function EthProvider({ children }: Props): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const events = ['chainChanged', 'accountsChanged'];
        const handleChange = (): void => {
            connectWallet(dispatch);
        };
        events.forEach((e) => window.ethereum.on(e, handleChange));

        return () => {
            events.forEach((e) =>
                window.ethereum.removeListener(e, handleChange),
            );
        };
    }, []);

    return (
        <EthContext.Provider
            value={useMemo(
                () => ({
                    state,
                    dispatch,
                }),
                [state, dispatch],
            )}
        >
            {children}
        </EthContext.Provider>
    );
}

export default EthProvider;
