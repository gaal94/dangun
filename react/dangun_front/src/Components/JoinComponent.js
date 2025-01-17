import React, { useState } from 'react';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import './JoinComponent.css';

function Join() 
{
    const [icon, setIcon] = useState("icon_09");
    const [isChecked, setIsChecked] = useState(false);

    const handleIconClick = () => 
    {
        const newIcon = icon === "icon_09" ? "icon_10" : "icon_09";
        setIcon(newIcon);
        setIsChecked(newIcon === "icon_10");
    };
    return (
    <>
        {/* Header */}
        <div className="header">
            <Header />
        </div>

        {/* Main */}
        <div className="box_container">
            <div className="box_item box_join">
                <table class="join_table">
                    <tr class="title">
                        <td>
                            <img
                                src={`${process.env.PUBLIC_URL}/images/02_icon/${icon}.jpg`}
                                alt="전체동의 아이콘"
                                onClick={handleIconClick}/>
                        </td>  
                        <td>
                            전체 동의하기
                        </td>
                    </tr>
                    <tr class="detail_first">
                        <td></td>
                        <td>
                            토마토 이용약관, 개인정보 수집 및 이용, 위치기반서비스 이용약관 동의를 포함합니다.
                        </td>
                    </tr>
                    <tr class="title">
                        <td>
                        </td>  
                        <td>
                            토마토 이용약관
                        </td>
                    </tr>
                    <tr class="detail">
                        <td></td>
                        <td>
                        본 약관은 다양한 토마토 서비스의 이용과 관련하여 토마토 서비스를 제공하는 토마토 주식회사(이하 '토마토')와 이를 이용하는 토마토 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 토마토 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
                        </td>
                    </tr>
                    <tr class="title">
                        <td>
                        </td>  
                        <td>
                            개인정보 수집 및 이용
                        </td>
                    </tr>
                    <tr class="detail">
                        <td></td>
                        <td>
                        개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
                        </td>
                    </tr>
                    <tr class="title">
                        <td>
                        </td>  
                        <td>
                            위치기반 서비스 이용약관
                        </td>
                    </tr>
                    <tr class="detail">
                        <td></td>
                        <td>
                        위치기반서비스 이용약관에 동의하시면, 위치를 활용한 광고 정보 수신 등을 포함하는 네이버 위치기반 서비스를 이용할 수 있습니다.
                        </td>
                    </tr>
                </table>                
                <input 
                type="button" 
                value="다음" 
                className="next_button"
                onClick={() => (window.location.href = '/join/joinnext')}
                disabled={!isChecked}/>
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
