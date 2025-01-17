package com.example.dangun.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
	
	@GetMapping("/item/my-list")
	public ResponseEntity getMyItemList(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("user");
	    if (userId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
	    }
	    ArrayList<ItemDTO> dto = itemService.getAllMyItems(userId);
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
    
    //중고 물품 등록 기능(아직 유저 정보랑은 연결 안됨)
    @PostMapping("/item/write")
    @ResponseBody
    public void insertItem(String title, int price, String country, String contents, String category, String img_src, MultipartFile multifile) throws IOException {
    	ItemDTO dto = new ItemDTO();
		dto.setTitle(title);
		dto.setPrice(price);
		dto.setCountry(country);
		dto.setContents(contents);
		dto.setCategory(category);
		String savePath = "c:/ezwel/upload/";
		String newfilename = null;
		if(!multifile.isEmpty()) {
			String originalfilename = multifile.getOriginalFilename();
			String before = originalfilename.substring(0, originalfilename.indexOf("."));
			String ext = originalfilename.substring(originalfilename.indexOf("."));
			newfilename = before + "(" + UUID.randomUUID() + ")" + ext;
			multifile.transferTo(new java.io.File(savePath + newfilename));
		}
		dto.setImgSrc(newfilename);
		itemService.insertItem(dto);
    }
    
    //물품 카테고리만 가져오는 기능(물품 등록 화면에 필요함)
    @GetMapping("/item/category")
    @ResponseBody
	ArrayList<String> getAllCategory() {
		return itemService.getAllCategory();
	}
}
