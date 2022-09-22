using Guestships.API.GameBuilder;

namespace Guestships.API.GameState
{
    public class GameShip
    {
        public int Id { get; set; }
        public ShipType ShipType { get; set; }
        public int Hits { get; set; }
        public bool IsSunk => Hits == (int)ShipType;

        public GameShip() { }

        public GameShip(IShip ship)
        {
            Id = ship.Id;
            ShipType = ship.ShipType;
            Hits = 0;
        }
    }
}
