import { InputGroup, InputGroupText } from "reactstrap";
import './Board.css';
import { Hole } from "./Hole";
import { ShipType } from "./ShipType";

export function Board() {
    const columnLabels: string[] = GetColumnLabels();
    const rowLabels: string[] = GetRowLabels();

    return (
        <div>
            { RenderRowWithColumnLabels(columnLabels) }
            { rowLabels.map(rowLabel => RenderRowWithLabel(rowLabel, columnLabels)) }
        </div>
    );
}

function RenderRowWithColumnLabels(columnLabels: string[]): JSX.Element {
    return (
        <InputGroup>
            <InputGroupText className="label"> </InputGroupText>
            { columnLabels.map(label => <InputGroupText className="label">{label}</InputGroupText>) }
        </InputGroup>
    );
}

function RenderRowWithLabel(rowLabel: string, columnLabels: string[]): JSX.Element {
    return (
        <InputGroup>
            <InputGroupText className="label">{rowLabel}</InputGroupText>
            { columnLabels.map(() => <Hole shipType={ShipType.NoShip} />) }
        </InputGroup>
    );
}

function GetRowLabels(): string[] {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
}

function GetColumnLabels(): string[] {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
}