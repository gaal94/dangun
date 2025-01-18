package com.example.dangun.Service;

import java.util.List;

import com.example.dangun.DTO.SeachDTO;

public interface SeachService {
	List<SeachDTO> seachlist(int pagenum, String keyword,String country,String category);
	int totalCount(String keyword,String country, String category);
	List<SeachDTO> coun (String country);
	SeachDTO detailList(int id);
}
