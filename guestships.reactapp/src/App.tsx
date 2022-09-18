import './App.css';
import { Board } from './Board';
import { FeedbackBox } from './FeedbackBox';
import { ShipType } from './ShipType';


function App() {
  return (
    <div className="App">
      <FeedbackBox shipHit={ShipType.Battleship} />
      <Board />
    </div>
  );
}

export default App;
