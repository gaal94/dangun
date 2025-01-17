import React, { useState } from 'react';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import './JoinNextComponent.css';

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
                <div className="join">
                    <table className="join_id">
                        <tr>
                            <td>
                            <input
                                type="text"
                                className="join_input_id"
                                placeholder="아이디"/>
                            </td>
                        </tr>
                    </table>
                    <table className="join_pw">
                        <tr>
                            <td>
                            <input
                                type="password"
                                className="join_input_pw"
                                placeholder="비밀번호"/>
                            </td>
                        </tr>
                    </table>
                    <table className="join_pw_check">
                        <tr>
                            <td>
                            <input
                                type="password"
                                className="join_input_pw_check"
                                placeholder="비밀번호 확인"/>
                            </td>
                        </tr>
                    </table>
                    <table className="join_name">
                        <tr>
                            <td>
                            <input
                                type="text"
                                className="join_input_name"
                                placeholder="이름"/>
                            </td>
                        </tr>
                    </table>
                    <table className="join_location">
                        <tr>
                            <td>
                            <input
                                type="password"
                                className="join_input_location"
                                placeholder="지역"/>
                            </td>
                        </tr>
                    </table>
                    <table className="join_email">
                        <tr>
                            <td>
                            <input
                                type="password"
                                className="join_input_email"
                                placeholder="이메일"/>
                            </td>
                        </tr>
                    </table>
                    <table className="join_phone">
                        <tr>
                            <td>
                            <input
                                type="password"
                                className="join_input_phone"
                                placeholder="폰번호"/>
                            </td>
                        </tr>
                    </table>
                    <input 
                    type="button" 
                    value="회원가입" 
                    className="join_button"/>
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
