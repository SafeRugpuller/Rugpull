const { expect } = require("chai");
const { ethers } = require("hardhat");

// Generic factory for initializing contract
const initContract = async (id, arguments) => {
  const factory = await ethers.getContractFactory(id);
  const contract = await factory.deploy(arguments);

  await contract.deployed();

  return [contract, factory];
};

const initToken = async (initialSupply) => {
  return initContract("Token", initialSupply);
};

describe("Token", function () {
  it("Should mint inital supply", async function () {
    const initialSupply = 100000;

    const [token, factory] = await initToken(initialSupply);

    const signerAddress = factory.signer.getAddress();
    expect(await token.balanceOf(signerAddress)).to.equal(
      initialSupply.toString()
    );
  });
});
