namespace Guestships.API.GameBuilder
{
    public class Hole : IHole
    {
        public bool IsHit { get; private set; }
        public IShip Ship { get; private set; }

        public Hole()
            => Ship = new NoShip();

        public void Hit()
            => IsHit = true;

        public void SetShip(IShip ship)
            => Ship = ship;
    }
}
