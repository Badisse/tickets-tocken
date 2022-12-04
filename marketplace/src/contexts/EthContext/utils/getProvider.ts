import { ethers } from 'ethers';

const getProvider = (): ethers.providers.Web3Provider => {
    return new ethers.providers.Web3Provider(window.ethereum);
};

export default getProvider;
