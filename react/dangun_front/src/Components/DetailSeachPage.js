import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DetailSeachPage = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/detail?id=${id}`);
        setDetail(response.data.detailList);
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };
  
      fetchDetail();
    }, [id]);
  
    if (!detail) return <p>Loading...</p>;
  

    
    return (
      <div>
        <h1>{detail.title}</h1>
        <img src={detail.img_src} alt="상품 이미지" className="result-image" />
        <p>가격: {detail.price.toLocaleString()} 원</p>
        <p>카테고리: {detail.category}</p>
        <p>지역: {detail.country}</p>
        <p>판매자: {detail.user_pk}</p>
      </div>
    );
  };

export default DetailSeachPage;