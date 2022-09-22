using Guestships.API.GameState;

namespace Guestships.API.GameBuilder
{
    public interface IShip
    {
        int Id { get; }
        bool IsSunk { get; }
        IHole[] Placement { get; }
        ShipType ShipType { get; }
    }
}