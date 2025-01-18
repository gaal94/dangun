import { useEffect, useState } from "react";
import axios from "axios";
import {timeCulFunc} from "../utils/timeUtil";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import "./ItemListComponent.css";

const ItemListComponent = ( ) => {

    const [userId, setUserId] = useState("");
    const [itemList, setItemList] = useState([]);
    
    useEffect(()=> {
        axios.post("http://localhost:9090/auth-check", {}, {withCredentials : true}).then((res) => {
          if(res.data != "Forbidden Error"){
            setUserId(res.data);
          }else{
            setUserId("");
          }
        }).catch((err) => console.log(err));
      }, [])

    useEffect(() => {
        axios.get("http://localhost:9090/item/list").then((res)=>{
            console.log(res.data);
            setItemList(res.data);
        }).catch((error) => {console.log("ERROR : ", error)});

    },[]);

    return (   
        <div>
            <div className="header">
                <Header userId={userId} />
            </div >
            <div className="item_list_container">
                <div className="box_item box_list">
                    <div>
                        <table>
                            <tr>
                                <th>품명</th><th>가격</th><th>지역</th><th>카테고리</th>
                            </tr>
                            {
                                itemList && itemList.length > 0 ? (
                                    itemList.map(item => (
                                        <tr key={item.id}>
                                            <td><a href={`/item/detail/${item.id}`}>{item.title}</a></td>
                                            <td>{item.price}</td>
                                            <td>{item.country}</td>
                                            <td>{item.category}</td>
                                            <td>{timeCulFunc(item.writeDate)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">아이템이 없습니다.</td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                </div>
                <div className="footer">
                <Footer /> 
                </div>       
            </div>
        </div>     
    )
}

export default ItemListComponent;