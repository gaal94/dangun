import { useEffect, useState } from "react";
import axios from "axios";
import {timeCulFunc} from "../utils/timeUtil";
const ItemListComponent = ( ) => {

    const [itemList, setItemList] = useState([]);


    useEffect(() => {
        axios.get(
            "http://localhost:9090/item/list").then((res)=>{
                setItemList(res.data);
                timeCulFunc(res.data.writeDate);
            }).catch((error) => {console.log("ERROR : ", error)});

    },[]);

    return (
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
    )
}

export default ItemListComponent;