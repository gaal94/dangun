package com.example.dangun.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dangun.DAO.ItemMapper;
import com.example.dangun.DTO.ItemDTO;
import com.example.dangun.DTO.ItemSaleDTO;

@Service
public class ItemService {

	@Autowired
	ItemMapper itemMapper;
	
	public ArrayList<ItemDTO> getAllItemList() {
		return itemMapper.getAllItemList();
	}
	
	public ItemSaleDTO getItemDetail(int id) {
		return itemMapper.getItemDetail(id);
	}
	
	public boolean endOfDeal(int userId, int itemId) {
		try {
			itemMapper.endOfDeal(userId, itemId);
			return true;
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
	}
	
	public boolean evaluateDeal(ItemSaleDTO dto) {
		try {
			itemMapper.evaluateDeal(dto);
			return true;
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
	}
}
