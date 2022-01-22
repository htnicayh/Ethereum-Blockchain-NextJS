const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const contract = require('./compile')

const { interface, bytecode } = contract
const provider = new HDWalletProvider(
    'worry knife angry captain clump business oval voice until damage act empty',
    'https://rinkeby.infura.io/v3/ed53e56f8eb0492c83d23c0c87aa6078'
);
    
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('account to deploy contract', accounts[0])
    console.log('gas price: ', await web3.eth.getGasPrice())
    console.log(interface)
    const results = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', gasPrice: '1000000008', from: accounts[0] });

    console.log('contract deployed to address ', results.options.address); // Not enough ether to deploy
}

deploy();