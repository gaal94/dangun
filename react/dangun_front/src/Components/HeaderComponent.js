import React, { useEffect, useState } from 'react';
import './HeaderComponent.css';
import axios from 'axios';


const Header = (props) =>{

  const [userId, setUserId] = useState("");
  useEffect(()=> {setUserId(props.userId);}, [props.userId]);
  
  const logout = async () => {
    const response = await axios.get("http://localhost:9090/logout", {}, {withCredentials : true});
    console.log(response);
    setUserId("");
    document.cookie = "JSESSIONID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=localhost";
  }

  return (
      <div className="header">
        <button
          className="header_logo"
          onClick={() => (window.location.href = '/')}>
          <img
            src={`${process.env.PUBLIC_URL}/images/01_logo/logo_01.jpg`}
            alt="로고 이미지"
          />
        </button>
        <div className="headermenu">
          <div className="banner">카테고리</div>
          <div className="banner-content">
            <a href="#">디지털기기</a>
            <a href="#">생활가전</a>
            <a href="#">가구/인테리어</a>
            <a href="#">생활/주방</a>
            <a href="#">유아동</a>
            <a href="#">유아도서</a>
            <a href="#">여성의류</a>
          </div>
        </div>
        <div className="headermenu">
          <div className="banner">부동산</div>
        </div>
        <div className="headermenu">
          <div className="banner">중고차</div>
        </div>
        <div className="headermenu">
          <div className="banner">알바</div>
        </div>
        <div className="headermenu">
          <div className="banner">동네업체</div>
        </div>
        <div className="headermenu">
          <div className="banner">동네생활</div>
        </div>
        <div className="headermenu">
          <div className="banner">모임</div>
        </div>
        <div className="headermenu">
          {
            userId && userId !== "" ? (
            <div>
              <div className="headermenu">{userId}님 환영합니다.</div>
              <button className="headermenu" onClick={logout}>로그아웃</button>
            </div>
            ):(
            <div className="headermenu">
              <div
                className="usermenu"
                id="usermenu_first"
                onClick={() => (window.location.href = '/login')}
              >로그인
              </div>
              <div className="headermenu">
                <div 
                  className="usermenu"
                  onClick={() => (window.location.href = '/join')}>
                  회원가입
                </div>
              </div>
            </div>
            )
          }
        </div>
      </div>
  );
}

export default Header;