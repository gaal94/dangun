import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation,useNavigate  } from 'react-router-dom';
import "./SeachBlistPage.css";

const SeachBlistPage = ({ searchParams }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const countryName = queryParams.get('country');
  const keyword = queryParams.get('keyword');
  const currentPage = parseInt(queryParams.get('pagenum') || "1", 10);
  const category = queryParams.get('category')

 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:9090/search?${searchParams}&pagenum=${currentPage}`
        // );
      const params = searchParams ? `${searchParams}&pagenum=${currentPage}` : `pagenum=${currentPage}`;
      
      
      const response = await axios.get(`http://localhost:9090/search?${params}`);
        setItems(response.data.searchList);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

   // if (searchParams) {
      fetchItems();
  //  }
  }, [searchParams, currentPage]);

  const renderPagination = () => {
    const totalPage = Math.ceil(total / 5);
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => {
            const updatedParams = new URLSearchParams(searchParams);
          updatedParams.set('pagenum', i);
          navigate(`?${updatedParams.toString()}`);
          }}
          
        >
          {i} 페이지
        </button>
      );
    }

    return (
      <div className="pagination">
        <h3>페이지 번호를 선택하세요</h3>
        {pages}
      </div>
    );
  };

  return (
    <div className="blist-page">
      {
      countryName && keyword && category? (
        <h3>지역 '{countryName}'과 '{category}'의 '{keyword}' 를 검색한 결과입니다.</h3>
      ) : 
      countryName && keyword ? (
        <h3>지역 '{countryName}'로 '{keyword}' 를 검색한 결과입니다.</h3>
      ) : 
      countryName && category? (
        <h3>지역 '{countryName}'과 '{category} 를 검색한 결과입니다.</h3>
      ) : 
      countryName ? (
        <h3>지역 '{countryName}'로 검색한 결과입니다.</h3>
      ) : 
      keyword ? (
        <h3>키워드 '{keyword}'로 검색한 결과입니다.</h3>
      ) : 
      category ? (
        <h3>카테고리 '{category}'로 검색한 결과입니다.</h3>
      ) : 
      (
        <h3>전체 검색 결과입니다.</h3>
      )
      }
        <h2>총 {total}건의 검색 결과가 있습니다.</h2>
      
      <div className="search-results">
        {items.map((item) => (
          <div key={item.id} className="result-card" 
          onClick={() => navigate(`/item/detail/${item.id}`)}
          style={{ cursor: "pointer" }}
          >
            <img src={item.img_src} alt="상품 이미지" className="result-image" />
            <div className="result-info">
              <h3 className="result-title">{item.title}</h3>
              <p className="result-price">{item.price.toLocaleString()} 원</p>
              <p className="result-category">카테고리: {item.category}</p>
              <p className="result-location">지역: {item.country}</p>
              <p className="result-seller">판매자: {item.user_pk}</p>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default SeachBlistPage;
