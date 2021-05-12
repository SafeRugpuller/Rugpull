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
  const [contract, factory] = await initContract("Rugpull", token);
  return [contract, factory];
};

const initToken = async (initialSupply) => {
  const [contract, factory] = await initContract("Token", initialSupply);
  return [contract, factory];
};

describe("Rugpull", function () {
  it("Should have token associated", async function () {
    const [token] = await initToken(100000);
    const [contract] = await initRugpull(token.address);
    expect(await contract.getAssociatedToken()).to.equal(token.address);
  });
  // Enter
  it("Should revert when balance of allowal too low", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;
    expect(token.transferFrom(creatorAddress, contractAddress, 100)).to.be
      .reverted;
  });
  it("Should update balance of entered address", async function () {});
  // it("Should transfer token from sender to contract", async function () {});
});
