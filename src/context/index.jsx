import React, { useContext, createContext, useState } from 'react';

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

    const [isActive, setIsActive] = useState('dashboard');

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

    const getCampaigns = async () => {
      const campaigns = await contract.call('getCampaigns');
      
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i,
      }));
      
      return parsedCampaigns;
      
    }

    const getUserCampaigns = async () => {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

      return filteredCampaigns;
    }

    return (
      <StateContext.Provider
        value={{
          address,
          contract,
          connect,
          createCampaign: publishCampaign,
          getCampaigns,
          getUserCampaigns,
          isActive,
          setIsActive,
        }}
      >
        {children}
      </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);
