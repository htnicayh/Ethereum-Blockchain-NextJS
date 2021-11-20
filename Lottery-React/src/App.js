import web3 from './web3-config'

const App = () => {
  web3.eth.getAccounts()
    .then(console.log)

  return (
    <div className="App">
      Hyacinth
      <pre>{web3.version}</pre>
    </div>
  );
}

export default App;
