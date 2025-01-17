package com.example.dangun.Controller;


import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.dangun.DTO.UserDTO;
import com.example.dangun.Service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity login(HttpServletRequest request, @RequestBody UserDTO dto) {
		UserDTO loginInfo = userService.login(dto);
		if(loginInfo != null) {
			HttpSession session = request.getSession();
			session.setAttribute("user",loginInfo.getId());
			return ResponseEntity.ok().body(loginInfo.getUserId());
		}else {
			return ResponseEntity.badRequest().body("잘못된 입력입니다.");
		}
	}
	
	@PostMapping("/sign")
	public ResponseEntity sign(@RequestBody UserDTO dto) {
		try {
	
			userService.sign(dto);
			return ResponseEntity.ok().body(null);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body("잘못된 입력입니다.");
		}
	}
	
	@PostMapping("/auth-check")
	public ResponseEntity getSession(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer id = (Integer)session.getAttribute("user");
		if(id == null) {
			return ResponseEntity.ok().body("Forbidden Error");
		}
		UserDTO user = userService.getUserById(id);
		if(user == null) {
			return ResponseEntity.ok().body("Forbidden Error");
		}
		return ResponseEntity.ok().body(user.getUserId());
	}
	
	@GetMapping("/logout")
	public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		// 쿠키 만료 처리
	    Cookie cookie = new Cookie("JSESSIONID", null);
	    cookie.setPath("/"); // 쿠키가 설정된 경로를 지정
	    cookie.setMaxAge(0); // 쿠키 만료 시간 설정
	    response.addCookie(cookie);
		return ResponseEntity.ok().body(null);
	}
	
	@GetMapping("/get-user/{id}")
	public ResponseEntity getUser(@PathVariable("id") int userId) {
		UserDTO user = userService.getUserById(userId);
		return ResponseEntity.ok().body(user);
	}
}
