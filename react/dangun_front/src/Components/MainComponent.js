import React, { useEffect, useState } from 'react';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import './MainComponent.css';
import Slider from "./SliderComponent";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SeachBlistPage from "./SeachBlistPage";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

const Main = () => {

  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태
  const [modalInput, setModalInput] = useState(''); // 모달 내부 입력값 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [externalInput, setExternalInput] = useState(''); // 외부 입력값 상태
  const [queryParams, setQueryParams] = useState(''); // URL 파라미터 상태
  const [searchParams, setSearchParams] = useState(""); // 검색 파라미터 상태
  const [showExtras, setShowExtras] = useState(true); // 슬라이더/카테고리 표시 여부
  const navigate = useNavigate();


  useEffect(()=> {
    axios.post("http://localhost:9090/auth-check", {}, {withCredentials : true}).then((res) => {
      if(res.data != "Forbidden Error"){
        setUserId(res.data);
      }else{
        setUserId("");
      }
    }).catch((err) => console.log(err));
  }, [])

  
  const openModal = () => setIsModalOpen(true);


  const closeModal = () => {
    setIsModalOpen(false);
    setModalInput(''); 
    setSearchResults([]); 
  };

 
  const handleModalInputChange = async (e) => {
    const value = e.target.value;
    setModalInput(value);

    if (value.trim()) {
      try {
        const response = await axios.get('http://localhost:9090/countries', {
          params: { country: value },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('검색 오류:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }

    
    const updatedParams = new URLSearchParams();
    updatedParams.append('country', value);
    setQueryParams(updatedParams.toString());
  };

  
  const handleExternalInputChange = (e) => {
    setExternalInput(e.target.value);
  };

  
  const handleExternalSearch = () => {
    const params = new URLSearchParams(queryParams);
    params.delete("keyword"); // 기존 키워드 제거
    //params.delete("pagenum");
    if (externalInput.trim()) {
      params.append("keyword", externalInput);
    }
    setQueryParams(params.toString());
    setSearchParams(params.toString()); // 검색 파라미터 상태 업데이트
    setShowExtras(false); // 검색 후 슬라이더/카테고리 숨기기
    navigate(`?${params.toString()}`);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
};

  const handleResultClick = (countryName) => {
    const updatedParams = new URLSearchParams(queryParams);
    updatedParams.set("country", countryName);
    setQueryParams(updatedParams.toString()); // country 업데이트
    setModalInput(countryName); // 모달 입력값 반영
    alert(`${countryName}이(가) 선택되었습니다.`);
    closeModal();
};

const handleCategoryClick = (category) => {
  const params = new URLSearchParams(queryParams);
  params.set("category", category); 
  //params.delete("keyword"); 
  //params.delete("country"); 
  setQueryParams(params.toString());
  navigate(`?${params.toString()}`);
  setSearchParams(params.toString());

  // URL 동기화
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
};

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

          <button className="main_location_button" onClick={openModal}>
            <img
              src={`${process.env.PUBLIC_URL}/images/02_icon/icon_11.jpg`}
              alt="지역 아이콘"
            />
            <span>지역검색</span>
          </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 style={{ textAlign: 'left' }}>지역 변경</h2>
          <hr/>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            value={modalInput}
            onChange={handleModalInputChange}
            placeholder="지역으로 검색"
            className="search_location"
          />
          <button className="css-button">검색</button>
          </div>
          <hr/>
          {!modalInput.trim() ? (
          <div className="search-results">
            <h4 style={{ textAlign: 'left' }}>추천 지역</h4>
          </div>
        ) : (
          <div className="alternate-results">
            <h4 style={{ textAlign: 'left' }}>검색 지역</h4>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result, index) => (
                  <li  key={index} style={{ textAlign: 'left' }} onClick={() => handleResultClick(result.country)}>
                    {result.country}
                  </li>
                ))}
              </ul>
            ) : (
              <h4 style={{ textAlign: 'left' }}>검색결과가 없습니다.</h4>
            )}
          </div>
        )}
          </Modal>
          <input
            type="text"
            className="main_search_input"
            value={externalInput}
            onChange={handleExternalInputChange}
            placeholder="검색어를 입력하세요"
          />
          <button className="main_search_button" onClick={handleExternalSearch}>
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

        {showExtras && (
          <>
            {/* 슬라이더 */}
            <div className="main_box_item ">
              <Slider />
            </div>

            {/* 인기 카테고리 */}
            <div className="main_box_item main_box_category_text">인기 카테고리</div>
                </>
              )}
            <div className={`main_box_item main_box_category ${!showExtras ? 'showExtrasClass' : ''}`}>
              <button className="main_category_btn" onClick={() => handleCategoryClick("가전 제품")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/02_icon/icon_02.jpg`}
                  alt="디지털기기 아이콘 이미지"
                />
                가전 제품
              </button>
              <button className="main_category_btn" onClick={() => handleCategoryClick("의류")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/02_icon/icon_03.jpg`}
                  alt="생활가전 아이콘 이미지"
                />
                의류
              </button>
              <button className="main_category_btn" onClick={() => handleCategoryClick("뷰티")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/02_icon/icon_04.jpg`}
                  alt="가구/인테리어 아이콘 이미지"
                />
                뷰티
              </button>
              <button className="main_category_btn" onClick={() => handleCategoryClick("가구")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/02_icon/icon_05.jpg`}
                  alt="생활/주방 아이콘 이미지"
                />
                가구
              </button>
              <button className="main_category_btn" onClick={() => handleCategoryClick("식품")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/02_icon/icon_06.jpg`}
                  alt="유아동 아이콘 이미지"
                />
                식품
              </button>
              <button className="main_category_btn" onClick={() => handleCategoryClick("유아 제품")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/02_icon/icon_07.jpg`}
                  alt="유아도서 아이콘 이미지"
                />
                유아 제품
              </button>
              <button className="main_category_btn" onClick={() => handleCategoryClick("기타 중고 제품")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/02_icon/icon_08.jpg`}
                  alt="여성의류 아이콘 이미지"
                />
                기타 중고 제품
              </button>
            </div>
        
        
      </div>
          {searchParams !== undefined && (
          <div
          className={`seach-blist-container ${!showExtras ? 'showExtrasClass' : ''}`}
        >
            <SeachBlistPage searchParams={searchParams || "" } />
          </div>
          )}
      
        

      {/* Footer */}
      <div className="footer">
        <Footer />        
      </div>
    </>
  );
} ;


export default Main;
