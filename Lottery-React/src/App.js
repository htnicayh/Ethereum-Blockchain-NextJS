import { useState, useEffect } from "react";
import web3 from './web3'
import lottery from "./lottery";
import initContract, { CLASS_BTN } from './Constant'
import SideDrawer from "./Sidedrawer";
import Button from './Button'
import './App.css'

const App = () => {
  const [contract, setContract] = useState(initContract)
  const [ether, setEther] = useState('')
  const [message, setMessage] = useState(null)
  const [toggle, setToggle] = useState(false)

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
    setEther('')

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting for your transaction ...')

    await lottery.methods.attend().send({
      from: accounts[0],
      value: web3.utils.toWei(ether, 'ether')
    })

    setMessage('Attend Ether Successfully !')
  }

  const handleRandom = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.luckyLottery().send({
      from: accounts[0]
    });

    setMessage('A winner has been picked!' );
  }

  const handleToggle = () => {
    setToggle((prevState) => {
      return !prevState
    })
  }

  return (
    <div className="App">
      {
        toggle ? (
          <div>
            <SideDrawer toggle={handleToggle} />
            <div 
              style={
                {
                  transform: toggle ? 'translate(-50%, -50%)': 'translate(-50%, -500%)',
                  zIndex: '10',
                  width: '35rem',
                  backgroundColor: 'whitesmoke',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.26)',
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transition: 'transform 1s',
                }
              }
            >
              <div style={{ 
                margin: '0 auto', 
                textAlign: 'center', 
                padding: '1rem 2rem'}}
              >
                <div 
                  style={{ 
                    fontSize: '1.3rem', 
                    textAlign: 'center', 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    padding: '0 0.3rem', 
                    width: '1rem', 
                    marginLeft: '30rem', 
                    border: '1px solid black'
                  }}
                  onClick={handleToggle}
                >
                    X
                </div>
                <ul className='app-ul'>
                    <p className='app-para'>
                      List Members
                    </p>
                  {members.map((member, index) => {
                    return (
                      <li className='app-li' key={index}>{index}. {member}</li>
                    )
                  })}
                </ul>
              </div>
            </div> 
          </div>
        ) : null
      }
      <h1 className='title'>Lottery Contract</h1>
      <p>This contract is managed by {address}</p>
      <p>There are currently {members.length} people attend, competing to win {web3.utils.fromWei(balance, 'ether')} ether !</p>
      <h3>List address members</h3>
      <Button 
        classBtn={CLASS_BTN}
        handle={handleToggle}
      >
        Members Attend
      </Button>

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
        <Button classBtn={CLASS_BTN}>Attend</Button>
      </form>

      <hr /> 

      <div>
        <h2>Random A Winner ?</h2>
        <Button 
          classBtn={CLASS_BTN}
          handle={handleRandom}
        >
          Random
        </Button>
      </div>
    </div>
  );
};

export default App;