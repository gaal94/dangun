import { useEffect, useState } from "react";
import axios from "axios";

const ListViewComponent = () => {
    const [myItems, setMyItems] = useState([]);
    const [chatList, setChatList] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:9090/item/my-list", { withCredentials: true }).then((res) =>{
            console.log(res.data);
            if(res.data && res.data.length > 0){
                setMyItems(res.data);
            }
        }).catch((err)=>{
            console.log(err);
        })

    },[])

    const openChat = async (itemId) => {
        try{
            const response = await axios.get(`http://localhost:9090/chat/get-chat/${itemId}`, { withCredentials: true });
            console.log(response.data);
            if(response.data){
                setChatList([...response.data]);
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <div>
                <div>내 물건 리스트</div>
                <div style={{display: "grid", gridTemplateColumns : "50% 50%"}}>
                    <div>
                    {
                        myItems || myItems.length > 0 ? (
                            <table>
                                <tr>
                                    <th>품목</th><th>가격</th><th>판매 위치</th><th>카테고리</th><th>작성일</th><th>채팅</th>
                                </tr>{
                                    myItems.map((item) => (
                                        <tr>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.country}</td>
                                            <td>{item.category}</td>
                                            <td>{item.writeDate}</td>
                                            <td><button onClick={()=> openChat(item.id)}>채팅방 보기</button></td>
                                        </tr>
                                    ))
                                }
                            </table>
                        ): <div>물건을 올려보세요</div>
                    }
                    </div>
                    <div>
                    {
                        chatList || chatList.length > 0 ? 
                        chatList.map((chat) => (
                            <div>{chat.wannerId}번째 구매자의 채팅 <a href={`http://localhost:3000/chatroom/${chat.roomId}/${chat.sellerId}/${chat.itemId}`}>채팅하기</a></div>
                        )):(
                            <div>채팅방 목록</div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListViewComponent;