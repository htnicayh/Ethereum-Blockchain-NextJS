const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

// console.log(solc.compile(source, 1).contracts[':Lottery'])

module.exports = solc.compile(source, 1).contracts[':Lottery']
// console.log(solc.compile(source, 1))
// Bytecode: deploy to network
// ABI: move to web3 constructor to test with Mocha