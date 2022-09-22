using Guestships.API.GameState;

namespace Guestships.API.GameBuilder
{
    public class BoardFactory
    {
        private readonly static Random Random = new Random();

        public string[] RowLabels { get; } = new[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" };

        public string[] ColumnLabels { get; } = new[] { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" };

        public IBoard GenerateNewBoard()
        {
            var holes = new Dictionary<string, Hole>();
            foreach (string columnLabel in ColumnLabels)
                foreach (string rowLabel in RowLabels)
                    holes[$"{columnLabel}{rowLabel}"] = new Hole();

            return new Board(holes, SetupShips(holes).ToList());
        }

        private IEnumerable<IShip> SetupShips(Dictionary<string, Hole> holes)
        {
            yield return SetShip(holes, 1, ShipType.Battleship);
            yield return SetShip(holes, 2, ShipType.Cruiser);
            yield return SetShip(holes, 3, ShipType.Cruiser);
        }

        private IShip SetShip(Dictionary<string, Hole> holes, int id, ShipType shipType)
        {
            List<CoordinateHole> placement = GetShipPlacement(holes, shipType);

            Ship ship = new Ship(id, shipType, placement.Select(ch => ch.Hole).ToArray());

            foreach (Hole hole in placement.Select(ch => ch.Hole))
                hole.SetShip(ship);

            return ship;
        }

        private List<CoordinateHole> GetShipPlacement(Dictionary<string, Hole> holes, ShipType shipType)
        {
            bool allHolesAreFine = false;

            CoordinateHole startHole, endHole;
            List<CoordinateHole> holesBetween;
            List<CoordinateHole> allHoles = new List<CoordinateHole>();

            do
            {
                startHole = GetEmptyRandomHole(holes);
                CoordinateHole? endHoleCandidate = GetEndHole(startHole.ColumnIndex, startHole.RowIndex, shipType, holes);

                if (endHoleCandidate.HasValue)
                {
                    endHole = endHoleCandidate.Value;
                    holesBetween = GetCoordinateHolesBetween(startHole, endHole, holes);

                    allHolesAreFine = holesBetween.All(h => h.Hole.Ship.ShipType == ShipType.NoShip);

                    if (allHolesAreFine)
                    {
                        allHoles.Add(startHole);
                        allHoles.AddRange(holesBetween);
                        allHoles.Add(endHole);
                    }
                }
            } while (!allHolesAreFine);

            return allHoles;
        }

        private CoordinateHole GetEmptyRandomHole(Dictionary<string, Hole> holes)
        {
            bool isHoleFree;
            int columnIndex, rowIndex;
            CoordinateHole coordinateHole;

            do
            {
                columnIndex = Random.Next(ColumnLabels.Length);
                rowIndex = Random.Next(RowLabels.Length);

                coordinateHole = GetCoordinateHoleFromIndexes(columnIndex, rowIndex, holes);
                isHoleFree = coordinateHole.Hole.Ship.ShipType == ShipType.NoShip;
            } while (!isHoleFree);

            return coordinateHole;
        }

        private CoordinateHole GetCoordinateHoleFromIndexes(int column, int row, Dictionary<string, Hole> holes)
            => new CoordinateHole(column, row, holes[GetCoordinatesFromIndexes(column, row)]);

        private string GetCoordinatesFromIndexes(int column, int row)
            => $"{ColumnLabels[column]}{RowLabels[row]}";

        private CoordinateHole? GetEndHole(int startColumnIndex, int startRowIndex, ShipType shipType, Dictionary<string, Hole> holes)
        {
            List<CoordinateHole> candidates = GetHoleCandidates(startColumnIndex, startRowIndex, shipType, holes);
            if (candidates.Count() > 0)
                return candidates[Random.Next(candidates.Count())];

            return null;
        }

        private List<CoordinateHole> GetHoleCandidates(int startColumnIndex, int startRowIndex, ShipType shipType, Dictionary<string, Hole> holes)
        {
            int shipLength = (int)shipType - 1;

            var candidates = new List<CoordinateHole>();
            AddIfAvailable(candidates,
                TryToGetHole(startColumnIndex, startRowIndex + shipLength, holes),
                TryToGetHole(startColumnIndex, startRowIndex - shipLength, holes),
                TryToGetHole(startColumnIndex - shipLength, startRowIndex, holes),
                TryToGetHole(startColumnIndex + shipLength, startRowIndex, holes)
                );

            return candidates;
        }

        private void AddIfAvailable(List<CoordinateHole> holes, params CoordinateHole?[] holesToAdd)
        {
            foreach (CoordinateHole? coordinateHole in holesToAdd)
                if (coordinateHole != null && coordinateHole.Value.Hole.Ship.ShipType == ShipType.NoShip)
                    holes.Add(coordinateHole.Value);
        }

        private CoordinateHole? TryToGetHole(int columnIndex, int rowIndex, Dictionary<string, Hole> holes)

        {
            if (columnIndex >= 0 && columnIndex < ColumnLabels.Length && rowIndex >= 0 && rowIndex < RowLabels.Length)
                return GetCoordinateHoleFromIndexes(columnIndex, rowIndex, holes);
            return null;
        }

        private List<CoordinateHole> GetCoordinateHolesBetween(CoordinateHole startHole, CoordinateHole endHole, Dictionary<string, Hole> holes)
        {
            if (startHole.RowIndex == endHole.RowIndex)
                return GetCoordinateHolesBetweenByColumn(startHole, endHole, holes);
            if (startHole.ColumnIndex == endHole.ColumnIndex)
                return GetCoordinateHolesBetweenByRow(startHole, endHole, holes);

            throw new InvalidOperationException("Holes are neither in the same row nor column.");
        }

        private List<CoordinateHole> GetCoordinateHolesBetweenByColumn(CoordinateHole startHole, CoordinateHole endHole, Dictionary<string, Hole> holes)
        {
            int startColumn = Math.Min(startHole.ColumnIndex, endHole.ColumnIndex);
            int endColumn = Math.Max(startHole.ColumnIndex, endHole.ColumnIndex);

            var coordinateHolesBetween = new List<CoordinateHole>();
            for (int i = startColumn + 1; i < endColumn; i++)
                coordinateHolesBetween.Add(GetCoordinateHoleFromIndexes(i, startHole.RowIndex, holes));

            return coordinateHolesBetween;
        }

        private List<CoordinateHole> GetCoordinateHolesBetweenByRow(CoordinateHole startHole, CoordinateHole endHole, Dictionary<string, Hole> holes)
        {
            int startRow = Math.Min(startHole.RowIndex, endHole.RowIndex);
            int endRow = Math.Max(startHole.RowIndex, endHole.RowIndex);

            var coordinateHolesBetween = new List<CoordinateHole>();
            for (int i = startRow + 1; i < endRow; i++)
                coordinateHolesBetween.Add(GetCoordinateHoleFromIndexes(startHole.ColumnIndex, i, holes));

            return coordinateHolesBetween;
        }

        private readonly record struct CoordinateHole(int ColumnIndex, int RowIndex, Hole Hole);
    }
}
