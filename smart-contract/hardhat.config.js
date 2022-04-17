require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path:'.env'})


module.exports = {
  solidity: "0.8.4",
  networks:{
    rinkeby:{
      url: "https://eth-rinkeby.alchemyapi.io/v2/XWBu7GbxIuHG3iv2SpEsSt71_QIImRQp",
      accounts: ["d59b0f3595b7fc48e04b47a62b99f167f2b72702f9100b9c1c354c244bcee7ca"]
    }
  }
};
