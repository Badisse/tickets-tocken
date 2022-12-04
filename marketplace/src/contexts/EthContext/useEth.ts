import { useContext } from 'react';
import EthContext from './EthContext';

const useEth = (): EthContextType => useContext(EthContext);

export default useEth;
