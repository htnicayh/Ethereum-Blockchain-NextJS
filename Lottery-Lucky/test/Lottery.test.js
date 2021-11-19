const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // communicate between javascript app & ethereum network (Constructor)
const contract = require('../compile')

const web3 = new Web3(ganache.provider()) // Instance of Web3
const { interface, bytecode } = contract

let accounts;
let inboxInstance;

beforeEach( async () => {
    // List of accounts
    // Function of web3 are asynchronous
    // Call function will return Promise.resolve
    accounts = await web3.eth.getAccounts()

    // One account to deploy contract
    // console.log({ interface, bytecode })
    inboxInstance = await new web3.eth.Contract(JSON.parse(interface)) // Instance of Contract
        .deploy({ data: bytecode, arguments: ['Ethereum'] })
        .send({ from: accounts[0], gas: '1000000' })

})

describe('Inbox', () => {
    it('deploy a contract, address already exist', () => {
        assert.ok(inboxInstance.options.address)
    })

    it('initial message exist', async () => {
        const message = await inboxInstance.methods.message().call()
        assert.equal(message, 'Ethereum')
    })

    it('set a new message', async () => {
        await inboxInstance.methods.setMessage('Blockchain').send({ from: accounts[0] })
        const message = await inboxInstance.methods.message().call();

        assert.equal(message, 'Blockchain');

    })
})




// class Inbox {
//     sendMessage() {
//         return 'Done'
//     }

//     statusMessage() {
//         return 'Success'
//     }
// }

// let inbox;

// beforeEach(() => {
//     if (inbox) {
//         console.log(inbox.sendMessage())
//     }
//     inbox = new Inbox();
// })

// describe('Testing Inbox', () => {
//     it('Check if Message is sent', () => {
//         assert.equal(inbox.sendMessage(), 'Done')
//     })

//     it('Check Message sent successfully !', () => {
//         assert.equal(inbox.statusMessage(), 'Success')
//     })
// })