using Guestships.API.GameState;

namespace Guestships.API.GameBuilder
{
    public class Ship : IShip
    {
        public int Id { get; }
        public ShipType ShipType { get; }
        public IHole[] Placement { get; }
        public bool IsSunk => Placement.All(h => h.IsHit);

        public Ship(int id, ShipType shipType, IHole[] placement)
        {
            Id = id;
            ShipType = shipType;
            Placement = placement;
        }
    }

    public class NoShip : IShip
    {
        public int Id => -1;

        public bool IsSunk => true;

        public IHole[] Placement { get; } = new IHole[0];

        public ShipType ShipType => ShipType.NoShip;
    }
}
