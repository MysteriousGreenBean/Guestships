import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import './App.css';
import { Board } from './Board';
import { BoardData, IBoardData } from './BoardData';
import { BoardDataGenerator, IBoardDataGenerator } from './BoardDataGenerator';
import { FeedbackBox } from './FeedbackBox';
import { LastMoveData, LastMoveDataType } from './LastMoveData';
import { IShip, Ship } from './Ship';


function App() {
  const [boardData, setBoardData] = useState<IBoardData>(BoardData.noBoardData);
  const [lastMoveData, setLastMoveData] = useState<LastMoveData>(new LastMoveData(LastMoveDataType.NoMove, Ship.noShip));

  useEffect(() => {
    const updateLastHitShip = (ship: IShip) => {
      let allShipsSunk = true;
      boardData.ships.forEach((ship: IShip) => allShipsSunk = allShipsSunk && ship.isSunk);
  
     if (allShipsSunk)
        setLastMoveData(new LastMoveData(LastMoveDataType.AllShipsSunk, ship));
      else
        setLastMoveData(new LastMoveData(LastMoveDataType.ShipShot, ship));
    };

    const boardDataGenerator: IBoardDataGenerator = new BoardDataGenerator();
    const boardData: IBoardData = boardDataGenerator.GenerateNewBoard();

    boardData.ships.forEach((shipToSubscribe: IShip) => {
      shipToSubscribe.OnHit = updateLastHitShip;
    });
    Ship.noShip.OnHit = updateLastHitShip;

    setBoardData(boardData);
  }, []);

  if (boardData.isInitialized) {
    return (
      <div className="App">
        <FeedbackBox lastMoveData={lastMoveData} />
        <Board boardData={boardData} />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Spinner>
          Generating game...
        </Spinner>
      </div>
    );
  };
}

export default App;
