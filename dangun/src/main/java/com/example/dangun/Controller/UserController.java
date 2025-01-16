package com.example.dangun.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.dangun.DTO.UserDTO;
import com.example.dangun.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {
	@Autowired
	UserService userService;
	
	
	@GetMapping("/get-session/{id}")
	public ResponseEntity getSession(HttpServletRequest request, @PathVariable("id") int id) {
		HttpSession session = request.getSession();
		session.setAttribute("user", id);
		return ResponseEntity.ok().body(null);
	}
	
	@GetMapping("/get-user/{id}")
	public ResponseEntity getUser(@PathVariable("id") int userId) {
		UserDTO user = userService.getUserById(userId);
		return ResponseEntity.ok().body(user);
	}
}
