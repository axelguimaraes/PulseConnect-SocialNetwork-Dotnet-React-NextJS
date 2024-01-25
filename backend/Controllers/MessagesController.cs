using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PulseConnect.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IMongoCollection<Messages> _messagesCollection;

        public MessagesController(IMongoCollection<Messages> messagesCollection)
        {
            _messagesCollection = messagesCollection;
        }

        public class MessageRequest
        {
            [Required]
            public required string Sender_ID { get; set; }

            [Required]
            public required string Receiver_ID { get; set; }

            [Required]
            public required string MessageContent { get; set; }

            public List<string>? AttachmentUrls { get; set; }
        }

        // GET: api/Messages/GetConversations?SenderID={SenderID}
        [HttpGet("GetConversations")]
        public async Task<IActionResult> GetConversations(string SenderID)
        {
            try
            {
                if (string.IsNullOrEmpty(SenderID))
                {
                    return BadRequest("SenderID cannot be null or empty.");
                }

                // Check if there are any Messages objects where the sender is involved
                var conversationsFilter = Builders<Messages>.Filter.Or(
                    Builders<Messages>.Filter.Eq(m => m.Sender_ID, SenderID),
                    Builders<Messages>.Filter.Eq(m => m.Receiver_ID, SenderID)
                );

                var conversations = await _messagesCollection.Find(conversationsFilter).ToListAsync();

                if (conversations == null || conversations.Count == 0)
                {
                    return NotFound($"No conversations found for Sender: {SenderID}");
                }

                // Return all conversations where the sender is involved
                return Ok(conversations);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }
        }


        // GET: api/Messages?SenderID={SenderID}&ReceiverID={ReceiverID}
        [HttpGet]
        public async Task<IActionResult> GetUserMessages(string SenderID, string ReceiverID)
        {
            try
            {
                if (string.IsNullOrEmpty(SenderID) || string.IsNullOrEmpty(ReceiverID))
                {
                    return BadRequest("SenderID and ReceiverID cannot be null or empty.");
                }

                // Check if there's a Messages object with the specified sender
                var senderFilter = Builders<Messages>.Filter.Eq(m => m.Sender_ID, SenderID);
                var senderMessages = await _messagesCollection.Find(senderFilter).FirstOrDefaultAsync();

                if (senderMessages == null)
                {
                    return NotFound($"No messages found for sender: {SenderID}");
                }

                // Use the found sender to search for the receiver
                var receiverFilter = Builders<Messages>.Filter.And(
                    Builders<Messages>.Filter.Eq(m => m.Sender_ID, SenderID),
                    Builders<Messages>.Filter.Eq(m => m.Receiver_ID, ReceiverID)
                );

                var userMessages = await _messagesCollection.Find(receiverFilter).FirstOrDefaultAsync();

                if (userMessages == null)
                {
                    return NotFound($"No messages found between sender: {SenderID} and receiver: {ReceiverID}");
                }

                // Return the MessagesList
                return Ok(userMessages.MessagesList);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MessageRequest messageRequest)
        {
            if (ModelState.IsValid)
            {
                // Check if conversation exists, if not, create one
                var conversationFilter = Builders<Messages>.Filter.Where(m =>
                    (m.Sender_ID == messageRequest.Sender_ID && m.Receiver_ID == messageRequest.Receiver_ID) ||
                    (m.Sender_ID == messageRequest.Receiver_ID && m.Receiver_ID == messageRequest.Sender_ID));

                var existingConversation = await _messagesCollection.Find(conversationFilter).FirstOrDefaultAsync();

                if (existingConversation == null)
                {
                    // Create a new conversation
                    var newConversation = new Messages
                    {
                        Sender_ID = messageRequest.Sender_ID,
                        Receiver_ID = messageRequest.Receiver_ID,
                        MessagesList = new List<Message>()
                    };

                    // MongoDB will automatically generate and assign an ObjectId for ID
                    await _messagesCollection.InsertOneAsync(newConversation);
                    existingConversation = newConversation;
                }

                // Add the new message to the conversation
                var newMessage = new Message
                {
                    MessageContent = messageRequest.MessageContent,
                    TimeStamp = DateTime.Now,
                    AttachmentUrls = messageRequest.AttachmentUrls,
                    Status = EnumStatus.Send
                };

                // MongoDB will automatically generate and assign an ObjectId for MessageID
                existingConversation.MessagesList.Add(newMessage);

                // Update the existing conversation in the database
                var conversationUpdateFilter = Builders<Messages>.Filter.Eq(m => m.ID, existingConversation.ID);
                await _messagesCollection.ReplaceOneAsync(conversationUpdateFilter, existingConversation);

                return Ok(existingConversation);
            }

            return BadRequest(ModelState);
        }

        /*
        // PUT: api/Messages/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(string id, [FromBody] Messages messages)
        {
            if (id != messages.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                var filter = Builders<Messages>.Filter.Eq(m => m.ID, id);
                await _messagesCollection.ReplaceOneAsync(filter, messages);
                return Ok(messages);
            }

            return BadRequest(ModelState);
        }
        */

        // DELETE: api/Messages/DeleteMessage/{conversationId}/{messageId}
        [HttpDelete("DeleteMessage/{conversationId}/{messageId}")]
        public async Task<IActionResult> DeleteMessage(string conversationId, string messageId)
        {
            // Validate conversationId and messageId
            if (!ObjectId.TryParse(conversationId, out var conversationObjectId) ||
                !ObjectId.TryParse(messageId, out var messageObjectId))
            {
                return NotFound();
            }

            // Create a filter to find the conversation
            var conversationFilter = Builders<Messages>.Filter.Eq(m => m.ID, conversationObjectId);

            // Find the conversation in the MongoDB collection
            var conversation = await _messagesCollection.Find(conversationFilter).FirstOrDefaultAsync();

            // If no matching conversation is found, return a NotFound response
            if (conversation == null)
            {
                return NotFound();
            }

            // Find and remove the message with the specified messageId
            var messageToRemove = conversation.MessagesList.FirstOrDefault(m => m.MessageID == messageObjectId);

            if (messageToRemove != null)
            {
                conversation.MessagesList.Remove(messageToRemove);

                // Update the existing conversation in the database
                var conversationUpdateFilter = Builders<Messages>.Filter.Eq(m => m.ID, conversationObjectId);
                await _messagesCollection.ReplaceOneAsync(conversationUpdateFilter, conversation);

                return Ok(messageToRemove);
            }

            return NotFound(); // If the message with the specified messageId is not found in the conversation
        }

        // DELETE: api/Messages/DeleteConversation/{conversationId}
        [HttpDelete("DeleteConversation/{conversationId}")]
        public async Task<IActionResult> DeleteConversation(string conversationId)
        {
            // Validate conversationId
            if (!ObjectId.TryParse(conversationId, out var conversationObjectId))
            {
                return NotFound();
            }

            // Create a filter to find the conversation
            var conversationFilter = Builders<Messages>.Filter.Eq(m => m.ID, conversationObjectId);

            // Find the conversation in the MongoDB collection
            var conversation = await _messagesCollection.Find(conversationFilter).FirstOrDefaultAsync();

            // If no matching conversation is found, return a NotFound response
            if (conversation == null)
            {
                return NotFound();
            }

            // Remove the entire conversation from the collection
            await _messagesCollection.DeleteOneAsync(conversationFilter);

            return Ok(conversation);
        }

        // GET: api/Messages/GetAllCollections
        [HttpGet("GetAllCollections")]
        public IActionResult GetAllCollections()
        {
            try
            {
                var database = _messagesCollection.Database;
                var collectionNames = database.ListCollectionNames().ToList();

                return Ok(collectionNames);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }
        }

    }
}