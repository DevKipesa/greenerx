const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Get the contract factory for GreenX
  const GreenX = await hre.ethers.getContractFactory("GreenX");

  // Deploy the contract
  const greenX = await GreenX.deploy();
  await greenX.deployed();

  // Log the contract address
  console.log("GreenX deployed to:", greenX.address);

  // Write the contract address to config.js for later use
  fs.writeFileSync('./config.js', `
  export const greenXAddress = "${greenX.address}";
  `);
}

// Run the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
