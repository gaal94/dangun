package com.example.dangun.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.dangun.DTO.ItemDTO;
import com.example.dangun.DTO.ItemSaleDTO;
import com.example.dangun.Service.ItemService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class ItemController {
	
	@Autowired
	ItemService itemService;
	
	// 권한 필요 X
	@GetMapping("/item/list")
	public ResponseEntity getItemList() {	
		ArrayList<ItemDTO> dto = itemService.getAllItemList();
		return ResponseEntity.ok().body(dto);
	}
	// 권한 필요 X
	@GetMapping("/item/detail/{itemId}")
	public ResponseEntity getItemDetail(@PathVariable("itemId") int id) {
		ItemSaleDTO dto = itemService.getItemDetail(id);
		return ResponseEntity.ok().body(dto);
	}
	
    @PostMapping("/item/deal-over")
    public ResponseEntity endOfDealItem(HttpServletRequest request, @RequestBody ItemSaleDTO dto) {
    	 HttpSession session = request.getSession();
    	 Integer userId = (Integer) session.getAttribute("user");
	    if (userId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
	    }
	    if(!itemService.endOfDeal(userId, dto.getId())) {
	    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Deal Failed");
	    }
    	return ResponseEntity.ok().body(null);
    }
    
    @PostMapping("/item/evaluate")
    public ResponseEntity evaluateDeal(HttpServletRequest request, @RequestBody ItemSaleDTO dto) {
    	HttpSession session = request.getSession();
    	Integer userId = (Integer) session.getAttribute("user");
	    if (userId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
	    }
	    if(!itemService.evaluateDeal(dto)){
	    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Evaluate Failed");
	    }
    	return ResponseEntity.ok().body(null);
    }
}
