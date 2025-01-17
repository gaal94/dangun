import React from 'react';
import './FooterComponent.css';

function Footer() 
{
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>(주)토마토마켓</td>
          </tr>
          <tr>
            <td>대표 ooo | 사업자번호 000-00-00000</td>
          </tr>
          <tr>
            <td>직업정보제공사업 신고번호A0000000000000</td>
          </tr>
          <tr>
            <td>통신판매업 신고번호 0000-서울서초-0000</td>
          </tr>
          <tr>
            <td>호스팅 사업자 Amazon Web Service(AWS)</td>
          </tr>
          <tr>
            <td>주소 서울특별시 구로구 디지털로 000, 00층 (토마토서비스)</td>
          </tr>
          <tr>
            <td>전화 1544-0000 | 고객문의 cs@tomatoservice.com</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <a href="#">이용약관</a>
            </td>
            <td>
              <a href="#">개인정보처리방침</a>
            </td>
            <td>
              <a href="#">운영정책</a>
            </td>
            <td>
              <a href="#">위치기반서비스 이용약관</a>
            </td>
            <td>
              <a href="#">이용자보호 비전과 계획</a>
            </td>
            <td>
              <a href="#">청소년보호정책</a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Footer;
