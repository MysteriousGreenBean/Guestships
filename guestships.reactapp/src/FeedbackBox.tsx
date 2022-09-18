import { Alert } from "reactstrap";
import { ShipType } from "./ShipType";
import './FeedbackBox.css';

export interface IFeedbackBoxProps {
    shipHit: ShipType;
}

export function FeedbackBox(props: IFeedbackBoxProps) {
    switch (props.shipHit) {
        case ShipType.NoShip:
            return (<Alert color="light" className="feedback">Miss!</Alert>);
        case ShipType.Battleship:
            return (<Alert color="danger" className="feedback">Battleship is hit!</Alert>);
        case ShipType.Cruiser:
            return (<Alert color="danger" className="feedback">Cruiser is hit!</Alert>);
    }
}