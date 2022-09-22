namespace Guestships.API.GameBuilder
{
    public interface IBoard
    {
        List<IShip> Ships { get; }
        IHole GetHole(string coordinates);
    }
}