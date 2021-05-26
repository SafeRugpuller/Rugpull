import { Contract, ContractFactory } from "@ethersproject/contracts";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  let token: Contract;
  let owner: Contract;
  let supply = 1000;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    // Init token
    const tokenFactory: ContractFactory = await ethers.getContractFactory(
      "Token"
    );
    token = await tokenFactory.deploy(supply);
  });

  it("Should mint inital supply", async function () {
    expect(await token.balanceOf(owner.address)).to.equal(supply);
  });

  it("should have creator as owner", async function () {
    expect(await token.owner()).to.be.equal(owner.address);
  });
});
