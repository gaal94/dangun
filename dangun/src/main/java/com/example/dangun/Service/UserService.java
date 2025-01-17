package com.example.dangun.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dangun.DAO.UserMapper;
import com.example.dangun.DTO.UserDTO;

@Service
public class UserService {
	
	@Autowired
	UserMapper userMapper;
	
	public UserDTO getUserById(int id) {
		try {
			return userMapper.getById(id);
		}catch(Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	public void sign(UserDTO dto) {
		try {
			int id = userMapper.findCreateId();
			dto.setId(id+1);
			userMapper.create(dto);
		}catch(Exception e) {
			System.out.println(e);
		}
	}
	
	public UserDTO login(UserDTO dto) {
		if(dto.getUserId() == null || dto.getPw() == null) {
			return null;
		}
		UserDTO user  = userMapper.getByUserId(dto.getUserId());
		if(user != null && user.getPw().equals(dto.getPw())) {
			return user ;
		}
		else {
			return null;
		}
	}
}
