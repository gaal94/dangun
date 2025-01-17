package com.example.dangun.DAO;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.dangun.DTO.ChatMsgDTO;
import com.example.dangun.DTO.ChatRoomDTO;

@Repository
@Mapper
public interface ChatMapper {
	void createRoom(ChatRoomDTO dto);
	
	String getRoomById(int id, int userId);
	
	ArrayList<ChatMsgDTO> getMsgByRoomId(String roomId);
	
	void addMsgByRoom(ChatMsgDTO dto);
	
	ArrayList<ChatRoomDTO> getAllChatByItem(int id, int userId);
}
