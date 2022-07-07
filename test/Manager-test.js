const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Manager", function () {
  let Manager,manager;
  before(async function () {
    Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
    await manager.deployed();
  });

  it("Should create a new ticket", async function () {
    await manager.createticket("test");
    let tickets = await manager.gettickets();
    expect(tickets[0].name).to.equal("test");
    });

  it("Should create a update ticket", async function () {
    await manager.updateticketname(0,"abc");
    let tickets = await manager.gettickets();
    expect(tickets[0].name).to.equal("abc");
    });

  it("Should create a ticket status", async function () {
    await manager.updatestatus(0,2);
    let tickets = await manager.gettickets();
    expect(tickets[0].status).to.equal(2);
    });

    
   it("Should return ticket lenght", async function () {
    await manager.createticket("test");
    await manager.createticket("ad");
    await manager.createticket("tedfvsbst");
    await manager.createticket("testfb");
    let tickets = await manager.gettickets();
    expect(tickets.length).to.equal(5);
    });
});

