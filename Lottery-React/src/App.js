import { useState, useEffect } from "react";
import web3 from './web3'
import lottery from "./lottery";
import './App.css'

const initContract = {
  address: '',
  members: [],
  balance: ''
}

const App = () => {
  const [contract, setContract] = useState(initContract)
  const [ether, setEther] = useState('')
  const [message, setMessage] = useState(null)

  const { address, members, balance } = contract

  useEffect(() => {
    const getInfo = async () => {
        const address = await lottery.methods.admin().call();
        const members = await lottery.methods.allMembers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        
        setContract({ address, members, balance })
    };

    getInfo();
  }, [members, balance])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting for your transaction ...')

    await lottery.methods.attend().send({
      from: accounts[0],
      value: web3.utils.toWei(ether, 'ether')
    })

    setMessage('Attend Ether Successfully !')
  }

  return (
    <div className="App">
      <h1 className='title'>Lottery Contract</h1>
      <p>This contract is managed by {address}</p>
      <p>There are currently {members.length} people attend, competing to win {web3.utils.fromWei(balance, 'ether')} ether !</p>
      <h3>List address members</h3>
      <ul>
        
      </ul>

      <hr />

      <form onSubmit={handleSubmit}>
        <h2>Do you want to attend this game ?</h2>
        <div className='form-control'>
          <label>Amount of Ether to attend !</label>
          {
            message 
            ? <p className='form-message'>{message}</p> 
            : null
          }
          <br />
          <br />
          <input
            className='form-input'
            value={ether}
            onChange={(event) => {
              setEther(event.target.value)
            }}
          />
        </div>
        <button className='form-button'>Attend</button>
      </form>
    </div>
  );
};

export default App;