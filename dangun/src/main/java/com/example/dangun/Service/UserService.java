package com.example.dangun.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dangun.DAO.UserMapper;
import com.example.dangun.DTO.UserDTO;

@Service
public class UserService {
	
	@Autowired
	UserMapper userMapper;
	
	public UserDTO getUserById(int userId) {
		return userMapper.getById(userId);
	}
}
