import { Button, InputGroup } from "reactstrap";
import './Board.css';
import { Hole } from "./Hole";
import { ShipType } from "./ShipType";

export function Board() {
    const columnLabels: string[] = GetColumnLabels();
    const rowLabels: string[] = GetRowLabels();

    return (
        <div data-testid="board">
            { RenderRowWithColumnLabels(columnLabels, 0) }
            { rowLabels.map((rowLabel, index) => RenderRowWithLabel(rowLabel, columnLabels, index)) }
        </div>
    );
}

function RenderRowWithColumnLabels(columnLabels: string[], rowKey: number): JSX.Element {
    return (
        <InputGroup key={rowKey}>
            { GetLabelButton(" ", "empty") }
            { columnLabels.map(label => GetLabelButton(label, label)) }
        </InputGroup>
    );
}

function RenderRowWithLabel(rowLabel: string, columnLabels: string[], rowKey: number): JSX.Element {
    return (
        <InputGroup key={rowKey}>
            { GetLabelButton(rowLabel, rowLabel) }
            { columnLabels.map(columLabel => <Hole key={rowLabel + columLabel} shipType={ShipType.NoShip} />) }
        </InputGroup>
    );
}

function GetLabelButton(label: string, key: string): JSX.Element {
    return <Button key={key} className="label" size="lg" disabled={true}>{label}</Button>
}

function GetRowLabels(): string[] {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
}

function GetColumnLabels(): string[] {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
}