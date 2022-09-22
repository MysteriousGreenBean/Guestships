namespace Guestships.API.GameBuilder
{
    public interface IHole
    {
        public bool IsHit { get; }
        public IShip Ship { get; }

        void Hit();
    }
}
