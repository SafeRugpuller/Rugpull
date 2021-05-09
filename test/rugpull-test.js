const { expect } = require("chai");
const { ethers } = require("hardhat");

// Generic factory for initializing contract
const initContract = async (id, arguments) => {
  const factory = await ethers.getContractFactory(id);
  const contract = await factory.deploy(arguments);

  await contract.deployed();

  return [contract, factory];
};

const initRugpull = async (token) => {
  return initContract("Rugpull", token);
};

const initToken = async (initialSupply) => {
  return initContract("Token", initialSupply);
};

describe("Rugpull", function () {
  it("Should have token associated", async function () {
    const [token] = await initToken(100000);
    const [contract] = await initRugpull(token.address);

    expect(await contract.getAssociatedToken()).to.equal(token.address);
  });
});
