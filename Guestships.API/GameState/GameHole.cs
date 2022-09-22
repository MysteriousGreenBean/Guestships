using Guestships.API.GameBuilder;

namespace Guestships.API.GameState
{
    [Serializable]
    public class GameHole
    {
        public bool IsHit { get; set; }
        public GameShip Ship { get; set; }

        public GameHole() { }

        public GameHole(IHole hole)
        {
            IsHit = hole.IsHit;
            Ship = new GameShip(hole.Ship);
        }
    }
}
