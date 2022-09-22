using System.Text.Json;
using System.Text.Json.Serialization;
using Guestships.API.GameBuilder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;

namespace Guestships.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        public const string SessionKeyName = "_GameState";
        private readonly BoardFactory boardFactory = new BoardFactory();

        [HttpGet(Name = "GetGameState")]
        public string GetGameState()
        {
            string gameStateString = HttpContext.Session.GetString(SessionKeyName) ?? string.Empty;


            return gameStateString;
        }



        [HttpPost(Name = "SetGameState")]
        public void SetGameState(string gameState)
        {
            HttpContext.Session.SetString(SessionKeyName, gameState);

           
        }
    }
}
