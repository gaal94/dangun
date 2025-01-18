package com.example.dangun.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dangun.DAO.SeachMapper;
import com.example.dangun.DTO.SeachDTO;
@Service
public class SeachDAO implements SeachService{
	
	@Autowired
	SeachMapper mapper;
	
	@Override
	public List<SeachDTO> seachlist( int pagenum, String keyword,String country,String category) {
		int cnt =5;
		int start = (pagenum-1)*cnt+1;
		int end = pagenum *cnt;
		
		Map<String, Object> params = new HashMap<>();
		params.put("country", country);
		params.put("keyword", keyword);
		params.put("category",category);
		params.put("start", start);
		params.put("end", end);
		
		return mapper.seachlist(params);
		}

	@Override
	public int totalCount(String keyword, String country,String category) {
		Map<String, Object> params = new HashMap<>();
		params.put("keyword", keyword);
		params.put("category",category);
		params.put("country", country);
		return mapper.totalCount(params);
	}

	@Override
	public List<SeachDTO> coun(String country) {
		 if (country == null || country.trim().isEmpty()) {
		        return new ArrayList<>();  // 빈 리스트 반환
		    }
		return mapper.coun(country);
	}

	@Override
	public SeachDTO detailList(int id) {
		
		return mapper.detailList(id);
	}
	
	
	
}
