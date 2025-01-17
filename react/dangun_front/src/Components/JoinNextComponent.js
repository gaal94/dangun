import React, { useState } from 'react';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import './JoinNextComponent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join() {
    const [icon, setIcon] = useState("icon_09");
    const [isChecked, setIsChecked] = useState(false);
    const [userId, setUserId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheckText, setPwCheckText] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pwCheck, setPwcheck] = useState(false);
    const navigate = useNavigate();

    const handleIconClick = () => {
        const newIcon = icon === "icon_09" ? "icon_10" : "icon_09";
        setIcon(newIcon);
        setIsChecked(newIcon === "icon_10");
    };

    const signFunc = async() => {
        if(!pwCheck) {
            alert("비밀번호 확인이 필요합니다.");
        }else{
            if(window.confirm(`${userId}로 회원가입을 진행하시겠습니까?`)){
                const reqObj = { userId, pw, name, country, email, phone };
                const response = await axios.post("http://localhost:9090/sign", reqObj);
                if(response.status == 200){
                    alert("회원가입 성공");
                    navigate("/");
                }else{
                    console.log(response);   
                }
            }
        }
    }

    const pwCheckFunc = () => {
        if(pw != "" && pw == pwCheckText){
            setPwcheck(true);
            alert("일치합니다.");
        }
        else {
            setPwcheck(false);
            alert("불일치합니다.");
        }
    }

    return (
        <>
            {/* Header */}
            <div className="header">
                <Header />
            </div>

            {/* Main */}
            <div className="box_container">
                <div className="box_item box_join">
                    <div className="join">
                        {/* 아이디 */}
                        <table className="join_id">
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="join_input_id"
                                        placeholder="아이디"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)} // Updates userId state
                                    />
                                </td>
                            </tr>
                        </table>

                        {/* 비밀번호 */}
                        <table className="join_pw">
                            <tr>
                                <td>
                                    <input
                                        type="password"
                                        className="join_input_pw"
                                        placeholder="비밀번호"
                                        value={pw}
                                        onChange={(e) => setPw(e.target.value)} // Updates password state
                                    />
                                </td>
                            </tr>
                        </table>

                        {/* 비밀번호 확인 */}
                        <table className="join_pw_check">
                            <tr>
                                <td>
                                    <input
                                        type="password"
                                        className="join_input_pw_check"
                                        placeholder="비밀번호 확인"
                                        value={pwCheckText}
                                        onChange={(e) => setPwCheckText(e.target.value)} // Updates passwordCheck state
                                    />
                                </td>
                            </tr>
                        </table>
                        <button className="btn_pw_check" onClick={pwCheckFunc}>비밀번호 확인</button>

                        {/* 이름 */}
                        <table className="join_name">
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="join_input_name"
                                        placeholder="이름"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} // Updates name state
                                    />
                                </td>
                            </tr>
                        </table>

                        {/* 지역 */}
                        <table className="join_location">
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="join_input_location"
                                        placeholder="지역"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)} // Updates location state
                                    />
                                </td>
                            </tr>
                        </table>

                        {/* 이메일 */}
                        <table className="join_email">
                            <tr>
                                <td>
                                    <input
                                        type="email"
                                        className="join_input_email"
                                        placeholder="이메일"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Updates email state
                                    />
                                </td>
                            </tr>
                        </table>

                        {/* 폰번호 */}
                        <table className="join_phone">
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="join_input_phone"
                                        placeholder="폰번호"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)} // Updates phone state
                                    />
                                </td>
                            </tr>
                        </table>

                        {/* 회원가입 버튼 */}
                        <input
                            type="button"
                            value="회원가입"
                            className="join_button"
                            onClick={signFunc}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <Footer />
            </div>
        </>
    );
}

export default Join;
