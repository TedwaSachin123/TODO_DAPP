//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Manager{
    struct Ticket{
        uint8 status;
        string name;
    }
    Ticket[] public tickets;
    function createticket(string memory _name)external{
        tickets.push(Ticket(0,_name));  /* 0 for todo, 1 for working, 2 for done */
    }

    function updateticketname(uint _index, string memory _name) external{
        tickets[_index].name = _name;
    }

    function updatestatus(uint _index, uint8 _status) external{
        tickets[_index].status = _status;
    }

    function gettickets() external view returns(Ticket[] memory){
        return tickets;
    }

}