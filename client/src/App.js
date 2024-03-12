import GenerateText from './components/GenerateText';

function App() {
  return (
    <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <h2>Input Text Here: </h2>
      <GenerateText />
    </div>
  );
}

export default App;
