package com.example.dangun.DAO;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.dangun.DTO.ItemDTO;
import com.example.dangun.DTO.ItemSaleDTO;

@Repository
@Mapper
public interface ItemMapper {
	
	ArrayList<ItemDTO> getAllItemList();
	
	ItemSaleDTO getItemDetail(int id);
	
	void endOfDeal(int userId, int itemId);
	
	void evaluateDeal(ItemSaleDTO dto);
	
	int insertItem(ItemDTO dto);
	
	ArrayList<String> getAllCategory();
}
