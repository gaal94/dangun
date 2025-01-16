package com.example.dangun.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;

import com.example.dangun.DAO.ChatMapper;
import com.example.dangun.DTO.ChatMsgDTO;
import com.example.dangun.DTO.ChatRoomDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class ChatService {
	@Autowired
	ChatMapper chatMapper;
	
	public String chatManage(ChatRoomDTO dto, int userId) {
		String currentRoomId = chatMapper.getRoomById((int)dto.getSellerId(), userId);
		// 있으면 룸번호 리턴
		if(currentRoomId != null) return currentRoomId;
		// 없으면 새로 만들기
		String randomId = UUID.randomUUID().toString();
		ChatRoomDTO chatRoom = new ChatRoomDTO(randomId, dto.getSellerId(), userId);
		chatMapper.createRoom(chatRoom);
		return randomId;
	}
	
	public ArrayList<ChatMsgDTO> getMsgByRoom(String roomId){
		ArrayList<ChatMsgDTO> messages = chatMapper.getMsgByRoomId(roomId);
		return messages;
	}
	
	public boolean addMsgByRoom(ChatMsgDTO dto) {
		try {
			chatMapper.addMsgByRoom(dto);
			return true;
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
	}

//	@PostConstruct
//	private void init() { chatRooms = new LinkedHashMap<>(); }
//
//	public List<ChatRoomDTO> findAllRoom() {
//		return new ArrayList<>(chatRooms.values());
//	}
//
//	public ChatRoomDTO findRoomById(String roomId) {
//		return chatRooms.get(roomId);
//	}

//	public <T> void sendMessage(WebSocketSession session, T message) {
//		try {
//			session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
//		} catch (IOException e) {
//			System.out.println(e.getMessage());
//		}
//	}
}