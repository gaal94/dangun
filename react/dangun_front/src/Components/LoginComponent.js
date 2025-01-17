import React, { useState } from 'react';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import './LoginComponent.css';

function Login() 
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => 
  {
    try 
    {
      const response = await fetch("http://localhost:9090/login/authenticate", 
        {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) 
      {
        setErrorMessage("로그인성공");
        window.location.href = "/home";
      } 
      else 
      {
        const data = await response.json();
        setErrorMessage(data.message || "로그인 실패");
      }
    } 
    catch (error) 
    {
      console.error("로그인 오류:", error);
      setErrorMessage("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <Header/>
      </div>

      {/* Main */}
      <div className="box_container">
        <div className="box_item box_login">
          <div className="login">
            <table className="login_id">
              <tr>
                <td>
                  <input
                    type="text"
                    className="input_id"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </td>
              </tr>
            </table>
            <table className="login_pw">
              <tr>
                <td>
                  <input
                    type="password"
                    className="input_pw"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </td>
              </tr>
            </table>
            <input 
              type="button" 
              value="로그인" 
              className="login_button"
              onClick={handleLogin}/>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
        <div className="box_item box_btns">
          <a href="#">비밀번호 찾기</a>
          <a href="#" id="box_btns_center">
            아이디 찾기
          </a>
          <a href="#">회원가입</a>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer/>        
      </div>
    </>
  );
}

export default Login;
