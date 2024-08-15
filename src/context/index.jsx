import React, { useContext, createContext, Children } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const { contract } = useContract('0xc1a92C054712597Ab2C9d079bf8FAD309b8e6e2a');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();
    if (address == "undefined") {
      connect();
    }

    const publishCampaign = async (form) => {
      try {
        const data = await createCampaign({
          args: [
            address, //owner
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image,
          ],
        });
        
        console.log("Contract call success", data);
      } catch (error) {
        console.log("Contract call failure", error);
      }
    }

    return (
      <StateContext.Provider
        value={{
          address,
          contract,
          createCampaign: publishCampaign,
        }}
      >
        {children}
      </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);

// 2:07:42