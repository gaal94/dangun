package com.example.dangun.DTO;

public class SeachDTO {
	String title, user_pk, country,category,img_src;
	int id, price;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUser_pk() {
		return user_pk;
	}
	public void setUser_pk(String user_pk) {
		this.user_pk = user_pk;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getImg_src() {
		return img_src;
	}
	public void setImg_src(String img_src) {
		this.img_src = img_src;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public SeachDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
