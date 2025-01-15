package com.example.dangun.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	@GetMapping("/")
	public ResponseEntity Test() {
		return ResponseEntity.ok("hi");
	}
}