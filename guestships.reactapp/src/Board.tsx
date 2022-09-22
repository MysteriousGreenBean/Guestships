import { Button, InputGroup } from "reactstrap";
import './Board.css';
import { IBoardData } from "./BoardData";
import { Hole } from "./Hole";
import { IShip } from "./Ship";

export interface IBoardProps {
    boardData: IBoardData;
}

export function Board(props: IBoardProps) {
    return (
        <div data-testid="board">
            { RenderRowWithColumnLabels(props.boardData.columnLabels, 0) }
            { props.boardData.rowLabels.map((rowLabel, index) => RenderRowWithLabel(rowLabel, props.boardData, index,)) }
        </div>
    );
}

function RenderRowWithColumnLabels(columnLabels: string[], rowKey: number): JSX.Element {
    return (
        <InputGroup key={rowKey}>
            { RenderLabelButton(" ", "empty") }
            { columnLabels.map(label => RenderLabelButton(label, label)) }
        </InputGroup>
    );
}

function RenderRowWithLabel(rowLabel: string, boardData: IBoardData, rowKey: number): JSX.Element {
    return (
        <InputGroup key={rowKey}>
            { RenderLabelButton(rowLabel, rowLabel) }
            { boardData.columnLabels.map(columLabel => RenderHole(columLabel, rowLabel, boardData)) }
        </InputGroup>
    );
}

function RenderLabelButton(label: string, key: string): JSX.Element {
    return <Button key={key} className="label" size="lg" disabled={true}>{label}</Button>
}

function RenderHole(columnLabel: string, rowLabel: string, boardData: IBoardData) {
    const coordinates: string = `${columnLabel}${rowLabel}`;
    const shipForHole: IShip = boardData.GetShipForCoordinates(coordinates);
    return <Hole key={coordinates} ship={shipForHole} />
}