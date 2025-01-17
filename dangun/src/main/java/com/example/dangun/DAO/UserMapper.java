package com.example.dangun.DAO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.dangun.DTO.UserDTO;

@Repository
@Mapper
public interface UserMapper {
	UserDTO getById(int id);
	
	UserDTO getByUserId(String userId);
}
