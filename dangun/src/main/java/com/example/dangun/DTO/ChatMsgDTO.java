package com.example.dangun.DTO;

public class ChatMsgDTO {
    private String roomId;
    private String sender;
    private String message;
    
    
   
    public String getSender() {
    	return sender;
    }
    
    public void setSender(String sender) {
    	this.sender = sender;
    }
    
    public String getMessage() {
    	return message;
    }
    
    public void setMessage(String message) {
    	this.message = message;
    }

	public String getRoomId() {
		return roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}
}