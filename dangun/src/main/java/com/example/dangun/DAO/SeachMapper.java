package com.example.dangun.DAO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.dangun.DTO.SeachDTO;

@Repository
@Mapper
public interface SeachMapper {
	List<SeachDTO> seachlist(Map params);
	int totalCount(Map params);
	List<SeachDTO> coun (String country);
	SeachDTO detailList (int id);
}
