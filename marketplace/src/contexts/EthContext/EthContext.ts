import { createContext } from 'react';
import { initialState } from './state';

const EthContext = createContext<EthContextType>({
    state: initialState,
    dispatch: () => null,
});

export default EthContext;
