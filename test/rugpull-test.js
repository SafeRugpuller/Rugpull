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
  let token;
  let contract;
  let owner;
  let supply = 1000;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    // Init token
    const tokenFactory = await ethers.getContractFactory("Token");
    token = await tokenFactory.deploy(supply);

    // Init contract
    const contractFactory = await ethers.getContractFactory("Rugpull");
    contract = await contractFactory.deploy(token.address);
  });

  it("Should have token associated", async function () {
    expect(await contract.associatedToken()).to.be.equal(token.address);
  });
  it("Should exceed allowance", async function () {
    await expect(
      token.transferFrom(owner.address, contract.address, supply)
    ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
  });
  it("Should exceed balance", async function () {
    await expect(contract.enter(supply + 1)).to.be.revertedWith(
      "ERC20: transfer amount exceeds balance"
    );
  });
  it("Should approve", async function () {
    await expect(token.approve(contract.address, supply)).to.not.be.reverted;
  });
  it("Should emit Entered", async function () {
    await token.approve(contract.address, supply);
    await expect(contract.enter(supply))
      .to.emit(contract, "Entered")
      .withArgs(owner.address, supply);
  });
  it("Should transfer token from sender to contract", async function () {
    await token.approve(contract.address, supply);
    await expect(() => contract.enter(supply)).to.changeTokenBalance(
      token,
      contract,
      supply
    );
  });
  it("Should reject native ether", async function () {
    expect(
      owner.sendTransaction({
        to: contract.address,
        value: supply,
      })
    ).to.be.reverted;
  });
  it("Should reject exit", async function () {
    await token.approve(contract.address, supply);
    await contract.enter(supply);

    expect(contract.exit(supply + 1)).to.be.revertedWith("Insufficient funds");
  });
  it("Should exit the contract and recieve the given amount", async function () {
    await token.approve(contract.address, supply);
    await contract.enter(supply);

    await expect(() => contract.exit(supply)).to.changeTokenBalance(
      token,
      owner,
      supply
    );
  });
});
