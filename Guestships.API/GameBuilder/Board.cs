namespace Guestships.API.GameBuilder
{
    public class Board : IBoard
    {
        public List<IShip> Ships { get; }
        public Dictionary<string, IHole> Holes { get; }

        public Board(Dictionary<string, Hole> holes, List<IShip> ships)
        {
            Holes = holes.ToDictionary(kv => kv.Key, kv => (IHole)kv.Value);
            Ships = ships;
        }

        public IHole GetHole(string coordinates)
            => Holes[coordinates];
    }
}
