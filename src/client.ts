import { createThirdwebClient } from "thirdweb";


// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.CLIENT_ID;

export const client = createThirdwebClient({
  clientId: "rAQUnPq7vMRZbJchVSy6fpWB5IQSXR0frLY2Pj5a-BTQ1Dl-e1VmIhv1Gilw6gzPjhw5zIK9kv5QkG5R5pmJJQ",
});
