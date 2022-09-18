import { useState } from "react";
import { Button } from "reactstrap";
import { ShipType } from "./ShipType";
import './Hole.css';

export interface IHoleProps {
    shipType: ShipType;  
}

export function Hole(props: IHoleProps) {
    const [isShot, setIsShot] = useState(false);

    let className = "hole";

    if (isShot) {
        let isHit = props.shipType !== ShipType.NoShip;
        className += isHit ? " shot-hit" : " shot-miss";
    }
    return <Button data-testid="hole"
        size="lg"
        className={className} 
        color="primary"
        onClick={event => {
            setIsShot(true);
            event.currentTarget.blur();
        }}>
            ●
        </Button>
}