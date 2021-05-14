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
    await expect(await contract.getAssociatedToken()).to.equal(token.address);
  });
  // Enter
  it("Should revert when balance of allowal too low", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;
    await expect(token.transferFrom(creatorAddress, contractAddress, 100)).to.be
      .reverted;
  });
  it("Should revert when balance too low", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;
    await token.approve(contractAddress, 999999999);

    await expect(contract.enter(100001)).to.be.reverted;
  });
  it("Should approve contract successfully", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;
    await expect(token.approve(contractAddress, 1000000)).to.be.not.reverted;
  });
  it("Should emit event when entering", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;
    await token.approve(contractAddress, 999999999);
    await expect(contract.enter(5000))
      .to.emit(contract, "Entered")
      .withArgs(creatorAddress, 5000);
  });
  it("Should transfer token from sender to contract", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;
    await token.approve(contractAddress, 999999999);
    await expect(() => contract.enter(5000)).to.changeTokenBalance(
      token,
      contract,
      5000
    );
  });
  it("Should not be possible to recieve ether", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;

    await expect(
      tokenFactory.signer.sendTransaction({
        to: contractAddress,
        value: 100,
      })
    ).to.be.reverted;
  });
  it("Should be reverted when exitting for a larger amount than in contract", async function () {
    const [token, tokenFactory] = await initToken(100000);
    const [contract, contractFactory] = await initRugpull(token.address);
    const creatorAddress = await tokenFactory.signer.getAddress();
    const contractAddress = contract.address;

    await token.approve(contract, 99999);
    await contract.enter(1000);

    // await expect(() => contract.exit(2000)).to.be.revertedWith(
    //   "Insufficient funds"
    // );
  });
  it("Should exit the contract and recieve the given amount", async function () {});
});
