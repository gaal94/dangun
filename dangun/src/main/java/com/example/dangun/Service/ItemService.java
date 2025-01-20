package com.example.dangun.Service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dangun.DAO.ItemMapper;
import com.example.dangun.DTO.ItemDTO;
import com.example.dangun.DTO.ItemSaleDTO;

@Service
public class ItemService {

	@Autowired
	ItemMapper itemMapper;
	@Autowired
	SqlSessionFactory sqlSessionFactory;
	
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


	public boolean insertItem(ItemDTO dto) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try(sqlSession) {
			// 수동으로 트랜잭션 시작
            sqlSession.getConnection().setAutoCommit(false); // AutoCommit 모드를 해제하여 수동으로 트랜잭션을 제어합니다.
			int itemId = itemMapper.itemCount();
			System.out.println(itemId);
            dto.setId(itemId);
            itemMapper.insertItem(dto);
			itemMapper.insertItemSale(dto);
			// 트랜잭션 커밋
            sqlSession.commit();
			return true;
		}catch(Exception e) {
			sqlSession.rollback();
			System.out.println(e);
			return false;
		}
	}
		
	public ArrayList<String> getAllCategory() {
		return itemMapper.getAllCategory();
	}
	
	public ArrayList<ItemDTO> getAllMyItems(int userId) {
		try {
			return itemMapper.getAllMyItems(userId);
		}catch(Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
}
