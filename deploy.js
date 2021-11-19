const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const contract = require('./compile')

const { interface, bytecode } = contract
const provider = new HDWalletProvider(
    'worry knife angry captain clump business oval voice until damage act empty',
    'https://mainnet.infura.io/v3/10d6c672b2914f6a88725ad89e8a3366'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('account to deploy contract', accounts[0])
    const results =  await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Ethereum'] })
        .send({ gas: '1000000', gasPrice: '2000000000', from: accounts[0] })

    console.log('contract deployed to ', results.options.address);
}

deploy();