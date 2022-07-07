require("@nomiclabs/hardhat-waffle");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const INFURA_KEY = "43999539775f40afa7da5a8d796f887d";
const metamask_private_key="f8ffc09c3e8bd3e53f3e4f0831ff9379af7f1e99cc10e56b2a179fab7cab6846";
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
   networks: {
  //   hardhat: {
  //     chainId: 1337}
  //    },

    rop: {
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts:[metamask_private_key],
      
    }
  }
};
