using Guestships.API.GameBuilder;

namespace Guestships.API.GameState
{
    [Serializable]
    public class GameBoard
    {
        public List<GameShip> Ships { get; set; }
        public Dictionary<string, GameHole> Holes { get; set; }

        public GameBoard() { }

        public GameBoard(IBoard board)
        {
            //Ships = board.Ships.
        }
    }
}
