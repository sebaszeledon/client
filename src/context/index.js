import React, { useContext, createContext, Children } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const { contract } = useContract('0xc1a92C054712597Ab2C9d079bf8FAD309b8e6e2a');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        const data = await createCampaign([
            address, //owner
            form.title, 
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
        ])
    }

}