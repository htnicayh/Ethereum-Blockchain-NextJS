const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const contract = require('../compile')

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = contract

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Lottery', async () => {
    it('deploy contract lottery', () => {
        assert.ok(lottery.options.address)
    })

    it('1 account join the lottery', async () => {
        await lottery.methods.attend().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        })

        const members = await lottery.methods.allMembers().call({
            from: accounts[0]
        })

        assert.equal(members[0], accounts[0])
        assert.equal(members.length, 1);
    })

    it('multiple accounts attend the lottery', async () => {
        await lottery.methods.attend().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        })
        await lottery.methods.attend().send({
            from: accounts[2],
            value: web3.utils.toWei('0.03', 'ether')
        })
        await lottery.methods.attend().send({
            from: accounts[3],
            value: web3.utils.toWei('0.04', 'ether')
        })

        const members = await lottery.methods.allMembers().call({
            from: accounts[0]
        })

        assert.equal(members.length, 3)
    })

    it('> .01 ether to attend', async () => {
        try {
            await lottery.methods.attend().send({
                from: accounts[1],
                value: 1000
            })
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it('members[randomNumber]', async () => {
        // try {
        //     await lottery.methods.luckyLottery().call({
        //         from: accounts[0]
        //     })
        //     assert(false);
        // } catch (error) {
        //     assert(error)
        // }
        await lottery.methods.attend().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        })
        
        await lottery.methods.luckyLottery().call({
            from: accounts[0]
        })
        const members = await lottery.methods.allMembers().call({
            from: accounts[0]
        })

        assert(members.length, 0)
    })

    it('transfer ether to members[randomNumber]', async () => {
        await lottery.methods.attend().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        })

        const balanceEther = await web3.eth.getBalance(accounts[1]); // get amount of ether in the contract (parameter accounts[index] to return ether of accounts[index])
        await lottery.methods.luckyLottery().send({
            from: accounts[0]
        })

        const finalEther = await web3.eth.getBalance(accounts[1]);
        const subtract = finalEther - balanceEther;
        assert(subtract == web3.utils.toWei('0.02', 'ether'))
    })
})

