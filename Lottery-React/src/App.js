import { useState, useEffect } from "react";
// import web3 from './web3-config'
import lotteryConfig from "./lottery-config";
import web3 from "./web3-config";
import './App.css'

const App = () => {
  const [contract, setContract] = useState({
    admin: '',
    members: [],
    balance: ''
  })
  const [ether, setEther] = useState('')

  const { admin, members, balance } = contract

  useEffect(() => {
    async function getAdmin() {
      const address = await lotteryConfig.methods.admin().call();
      const members = await lotteryConfig.methods.allMembers().call();
      const balance = await web3.eth.getBalance(lotteryConfig.options.address);

      setContract((prevState) => {
        return {
          ...prevState,
          admin: address,
          members: members,
          balance: balance
        }
      })
    }

    getAdmin()
  }, [members, balance])

  return (
    <div className="App">
      <h1 className='title'>Lottery Contract</h1>
      <p>This contract is managed by{admin}</p>
      <p>There are currently {members.length} people attend, competing to win {web3.utils.fromWei(balance, 'ether')} ether !</p>
      <h3>List address members</h3>
      <ul>
        {members.length ? members.map((member, index) => {
          return (
            <li key={index}>{member}</li>
          )
        }) : null}
      </ul>

      <hr />

      <form>
        <h2>Do you want to attend this game ?</h2>
        <div className='form-control'>
          <label>Amount of Ether to attend !</label>
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