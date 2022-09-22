import { Alert, Button } from "reactstrap";
import { ShipType } from "./ShipType";
import './FeedbackBox.css';
import { LastMoveData, LastMoveDataType } from "./LastMoveData";
import { IShip } from "./Ship";

export interface IFeedbackBoxProps {
    lastMoveData: LastMoveData;
}

export function FeedbackBox(props: IFeedbackBoxProps) {
    switch (props.lastMoveData.lastMoveType) {
        case LastMoveDataType.NoMove:
            return null;
        case LastMoveDataType.ShipShot:
            return HandleShot(props.lastMoveData.lastShotShip)
        case LastMoveDataType.AllShipsSunk:
            return <Alert color="warning" className="feedback">All ships are destroyed, congratulations! <Button color="success" onClick={() => window.location.reload()}>Start again?</Button></Alert>
    }
}

function HandleShot(shipHit: IShip): JSX.Element {
        switch (shipHit.shipType) {
            case ShipType.NoShip:
                return (<Alert color="light" className="feedback">Miss!</Alert>);
            default:

            case ShipType.Battleship:
                return (<Alert color="danger" className="feedback">Battleship is hit{shipHit.isSunk ? " and sunk" : ""}!</Alert>);
            case ShipType.Cruiser:
                return (<Alert color="danger" className="feedback">Cruiser is hit{shipHit.isSunk ? " and sunk" : ""}!</Alert>);
    }
}