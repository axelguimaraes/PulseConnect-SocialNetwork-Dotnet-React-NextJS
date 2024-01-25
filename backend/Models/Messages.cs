using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PulseConnect.Models
{
    public class Messages
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId ID { get; set; }

        [Required]
        [BsonElement("sender_ID")]
        public required string Sender_ID { get; set; }

        [Required]
        [BsonElement("receiver_ID")]
        public required string Receiver_ID { get; set; }

        [BsonElement("messages")]
        public required List<Message> MessagesList { get; set; }
    }

    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId MessageID { get; set; }

        [Required]
        [BsonElement("messageContent")]
        public required string MessageContent { get; set; }

        [Required]
        [BsonElement("timeStamp")]
        public DateTime TimeStamp { get; set; }

        [BsonElement("attachmentUrls")]
        public List<string>? AttachmentUrls { get; set; }

        [Required]
        [BsonElement("status")]
        public EnumStatus Status { get; set; }
    }

    public enum EnumStatus
    {
        Send,
        Read,
        Failed
    }
}
