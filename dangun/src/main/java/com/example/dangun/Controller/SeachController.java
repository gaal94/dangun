package com.example.dangun.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dangun.DTO.SeachDTO;
import com.example.dangun.Service.SeachService;


@RestController
public class SeachController {
	
	@Autowired
	@Qualifier("seachDAO")
	SeachService seachService;
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping(value = "/countries", produces = "application/json;charset=utf-8")
	public List<SeachDTO> country(@RequestParam(value ="country", required = false) String country) {
		System.out.println(country);
		List<SeachDTO> countrylist = seachService.coun(country);
		return countrylist;
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping(value = "/search", produces = "application/json;charset=utf-8")
	public Map<String, Object> seachlist(@RequestParam(value="pagenum", required = false, defaultValue = "1") int pagenum,
											@RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
											@RequestParam(value ="country", required = false, defaultValue = "") String country,
											@RequestParam(value ="category", required = false, defaultValue = "") String category) {
		List<SeachDTO> list = seachService.seachlist(pagenum, keyword,country,category);
		int total = seachService.totalCount(keyword, country,category);
		
		Map<String, Object> response = new HashMap<>();
        response.put("searchList", list);
        response.put("total", total);
        response.put("keyword", keyword);

        return response;
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping(value = "/detail", produces = "application/json;charset=utf-8")
	public Map<String, Object> detailList(@RequestParam(value="id", required = true) int id ) {
		SeachDTO detailList = seachService.detailList(id);
		Map<String, Object> response = new HashMap<>();
        response.put("detailList", detailList);


        return response;
	}
	
}
