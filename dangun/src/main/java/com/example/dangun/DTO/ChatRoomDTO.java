package com.example.dangun.DTO;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import com.example.dangun.Service.ChatService;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ChatRoomDTO {

	private String roomId;
	private int sellerId;
	private int wannerId;


    public ChatRoomDTO(String roomId, int sellerId, int wannerId) {
        this.roomId = roomId;
        this.sellerId = sellerId;
        this.wannerId = wannerId;
    }
    // Getter & Setter
    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String id) {
        this.roomId = roomId;
    }

	public int getSellerId() {
		return sellerId;
	}
	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}
	public int getWannerId() {
		return wannerId;
	}
	public void setWannerId(int wannerId) {
		this.wannerId = wannerId;
	}
}
