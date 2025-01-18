import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SeachListPage.css';

// 모달 컴포넌트: 모달이 열리고 닫히는 기능과 내용을 렌더링합니다.
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

// 메인 화면과 모달 및 외부 검색 기능
const SeachListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태
  const [modalInput, setModalInput] = useState(''); // 모달 내부 입력값 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [externalInput, setExternalInput] = useState(''); // 외부 입력값 상태
  const [queryParams, setQueryParams] = useState(''); // URL 파라미터 상태
  const navigate = useNavigate();

  // 모달 열기 함수
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setModalInput(''); // 모달 닫을 때 입력값 초기화
    setSearchResults([]); // 검색 결과 초기화
  };

  // 모달 입력값 변경
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

    // modalInput으로 queryParams 업데이트
    const updatedParams = new URLSearchParams();
    updatedParams.append('country', value);
    setQueryParams(updatedParams.toString());
  };

  // 외부 검색 입력값
  const handleExternalInputChange = (e) => {
    setExternalInput(e.target.value);
  };

  // 외부 검색 버튼 클릭
  const handleExternalSearch = () => {
    const finalParams = new URLSearchParams(queryParams);

    if (externalInput.trim()) {
      finalParams.append('keyword', externalInput);
    }

    navigate(`/SeachBlistPage?${finalParams.toString()}`);
  };

  // 검색 결과 클릭
  const handleResultClick = (countryName) => {
    const updatedParams = new URLSearchParams(queryParams);
    updatedParams.set('country', countryName);
    setQueryParams(updatedParams.toString());
    closeModal(); // 모달 닫기
  };

  return (
    <div className="list-page">
      <h1>검색기능</h1>

      {/* 검색 영역 */}
      <div className="external-search">
        <input
          type="text"
          value={externalInput}
          onChange={handleExternalInputChange}
          placeholder=""
        />
        <button className="css-button" onClick={handleExternalSearch}>검색</button>
      </div>

      <button className="css-button" onClick={openModal}>지역 변경</button>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>지역 변경</h2>
        <hr/>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            value={modalInput}
            onChange={handleModalInputChange}
            placeholder="지역으로 검색"
          />
          <button className="css-button">검색</button>
        </div>
        <hr/>
        {!modalInput.trim() ? (
          <div className="search-results">
            <h4>추천 지역</h4>
          </div>
        ) : (
          <div className="alternate-results">
            <h4>검색 지역</h4>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index} onClick={() => handleResultClick(result.country)}>
                    {result.country}
                  </li>
                ))}
              </ul>
            ) : (
              <h4>검색결과가 없습니다.</h4>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SeachListPage;
