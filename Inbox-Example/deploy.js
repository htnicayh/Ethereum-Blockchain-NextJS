const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const contract = require('./compile')

const { interface, bytecode } = contract
const provider = new HDWalletProvider(
    'worry knife angry captain clump business oval voice until damage act empty',
    'https://rinkeby.infura.io/v3/10d6c672b2914f6a88725ad89e8a3366'
);
    
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)

    console.log('account to deploy contract', accounts[0])
    console.log(await web3.eth.getGasPrice())
    const results = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Ethereum'] })
        .send({ gas: '1000000', gasPrice: '1000000008', from: accounts[0] });

    console.log('contract deployed to ', results.options.address); // Not enough ether to deploy
}

deploy();