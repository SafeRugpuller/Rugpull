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

    await token.balanceOf(factory.signer.getAddress()).then((value) => {
      expect(value.toString()).to.equal(initialSupply.toString());
    });
  });
});
