using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace PulseConnect.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string senderId, string receiverId, string message)
        {
            await Clients.Users(senderId, receiverId).SendAsync("ReceiveMessage", senderId, message);
        }
    }
}
