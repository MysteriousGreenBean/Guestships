import { useState } from "react";
import { Button } from "reactstrap";
import { ShipType } from "./ShipType";
import './Hole.css';
import { IShip } from "./Ship";

export interface IHoleProps {
    ship: IShip; 
}

export function Hole(props: IHoleProps) {
    const [isShot, setIsShot] = useState(false);

    let className = "hole";

    if (isShot) {
        let isHit = props.ship.shipType !== ShipType.NoShip;
        className += isHit ? " shot-hit" : " shot-miss";
    }
    return <Button data-testid="hole"
        size="lg"
        className={className} 
        color="primary"
        onClick={event => {
            if (!isShot) {
                props.ship.Hit();
                event.currentTarget.blur();
                setIsShot(true);
            }
        }}>
            ●
        </Button>
}