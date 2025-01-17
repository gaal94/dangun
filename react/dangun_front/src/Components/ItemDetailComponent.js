import { useState, useEffect } from "react";
import axios from "axios";
import {useParams ,useNavigate} from 'react-router-dom';
import {timeCulFunc} from "../utils/timeUtil";

const ItemDetailComponent = () => {

  const [itemDetail, setItemDetail] = useState({});
  const { item_id } = useParams();
  const navigate = useNavigate()
  ;
  useEffect(() => {
    axios.get(
        `http://localhost:9090/item/detail/${item_id}`).then((res)=>{setItemDetail(res.data); console.log(res.data)}).catch((error) => {console.log("ERROR : ", error)});
    },[]);

  const openChatFunc = async (sellerId) => {
    try{
        const responseData = await axios.post("http://localhost:9090/chat/manage", {
            sellerId, itemId : item_id
        },{
            withCredentials: true,  // 쿠키 포함을 위해 이 옵션을 설정
          });
        if(responseData.status === 200){
            console.log(responseData);
            const ROOMID = Object.keys(responseData.data);
            console.log("create success");
            navigate(`/chatroom/${ROOMID}/${responseData.data[ROOMID]}/${item_id}`);
        }

    }catch(err){
      if(err.status == 400) alert("판매자입니다.");
      else if(err.status == 401) alert("로그인하세요");
      console.log(err);
    }
}

  return (
      <div>
          {
            itemDetail? (
              <div>
                <div>카테고리 : {itemDetail.category}</div>
                {itemDetail.imgSrc? <img src={itemDetail.imgSrc}/> : <img src="/nothing.png"/>}
                <div>품명 : {itemDetail.title}</div>
                <div>판매자 : {itemDetail.userName}</div>
                <div>희망 판매 가격 : {itemDetail.price}</div>
                <div>희망 판매 위치 : {itemDetail.country}</div>
                <div>{timeCulFunc(itemDetail.writeDate)}</div>
                <div>판매자 평점 : {itemDetail.star}</div>
                {itemDetail.sale?(
                  <div>판매가 종료된 상품입니다.</div>
                ):<button onClick={()=> openChatFunc(itemDetail.userPk)}>채팅하기</button>
              }</div>
            ) : <div>Loading...</div> /* 데이터가 없으면 로딩 중 메시지 */
          }
      </div>
  )
}

export default ItemDetailComponent;