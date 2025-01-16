package com.example.dangun.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.dangun.DTO.ChatMsgDTO;
import com.example.dangun.DTO.ChatRoomDTO;
import com.example.dangun.DTO.ItemSaleDTO;
import com.example.dangun.Service.ChatService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class ChatController {

	@Autowired
	ChatService chatService;
	
	
	// 채팅방 불러오기 or 생성하기
    @PostMapping("/chat/manage")
    public ResponseEntity createRoom(@RequestBody ChatRoomDTO dto, HttpServletRequest request) {
    	 HttpSession session = request.getSession();
    	 Integer userId = (Integer) session.getAttribute("user");
	    if (userId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
	    }
    	String roomId = chatService.chatManage(dto, userId);
    	HashMap<String, Integer> body = new HashMap<String,Integer>();
    	body.put(roomId, userId);
       return ResponseEntity.ok().body(body );
    }
    
    @GetMapping("/chat/get-msg/{room_id}")
    public ResponseEntity getMsgByRoom(@PathVariable("room_id") String roomId) {
    	ArrayList<ChatMsgDTO> messages = chatService.getMsgByRoom(roomId);
    	return ResponseEntity.ok().body(messages);
    }
    
    @PostMapping("/chat/add-msg")
    public ResponseEntity addMsgByRoom(@RequestBody ChatMsgDTO dto) {
    	if(!chatService.addMsgByRoom(dto)) {
    		return ResponseEntity.badRequest().body("can't push messages");
    	}
    	
    	return ResponseEntity.ok().body(null);
    }
}
