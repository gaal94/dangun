import React, { useEffect, useState } from 'react';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import './MainComponent.css';
import Slider from "./SliderComponent";
import axios from "axios";
const Main = () => {

  const [userId, setUserId] = useState("");

  useEffect(()=> {
    axios.post("http://localhost:9090/auth-check", {}, {withCredentials : true}).then((res) => {
      if(res.data != "Forbidden Error"){
        setUserId(res.data);
      }else{
        setUserId("");
      }
    }).catch((err) => console.log(err));
  }, [])

  return (
    <>
      {/* Header */}
      <div className="header">
        <Header userId={userId}/>
      </div>

      {/* Main */}
      <div className="main_box_container">
        
        {/* 검색 */}
        
        <div className="main_box_item main_box_search">
          <button className="main_location_button">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_11.jpg`}
              alt="지역 아이콘"
            />
          </button>
          <input
            type="text"
            className="main_search_input"
            placeholder="검색어를 입력하세요"
          />
          <button className="main_search_button">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_01.jpg`}
              alt="검색 아이콘"
            />
          </button>
        </div>

        {/* 인기 검색어 */}
        <div className="main_box_item main_box_suggest">
          인기 검색어
          <a href="#">굿즈</a>
          <a href="#">플스</a>
          <a href="#">닌텐도</a>
          <a href="#">다이슨</a>
          <a href="#">캠핑</a>
          <a href="#">포토카드</a>
          <a href="#">에어팟</a>
          <a href="#">스타벅스</a>
          <a href="#">달력</a>
          <a href="#">삼성</a>
          <a href="#">다이소</a>
          <a href="#">가습기</a>
          <a href="#">기프티콘</a>
          <a href="#">상품권</a>
          <a href="#">기프트카드</a>
          <a href="#">노트북</a>
          <a href="#">레고</a>
        </div>

        {/* 슬라이더 */}
        <div className="main_box_item ">
          <Slider />
        </div>

        {/* 인기 카테고리 */}
        <div className="main_box_item main_box_category_text">인기 카테고리</div>
        <div className="main_box_item main_box_category">
          <button className="main_category_btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_02.jpg`}
              alt="디지털기기 아이콘 이미지"
            />
            디지털기기
          </button>
          <button className="main_category_btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_03.jpg`}
              alt="생활가전 아이콘 이미지"
            />
            생활가전
          </button>
          <button className="main_category_btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_04.jpg`}
              alt="가구/인테리어 아이콘 이미지"
            />
            가구/인테리어
          </button>
          <button className="main_category_btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_05.jpg`}
              alt="생활/주방 아이콘 이미지"
            />
            생활/주방
          </button>
          <button className="main_category_btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_06.jpg`}
              alt="유아동 아이콘 이미지"
            />
            유아동
          </button>
          <button className="main_category_btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_07.jpg`}
              alt="유아도서 아이콘 이미지"
            />
            유아도서
          </button>
          <button className="main_category_btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_08.jpg`}
              alt="여성의류 아이콘 이미지"
            />
            여성의류
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer />        
      </div>
    </>
  );
} 


export default Main;