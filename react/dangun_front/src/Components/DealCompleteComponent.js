import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DealCompleteComponent = () => {
    const [star, setStar] = useState(0); // 별점 상태
    const {itemId} = useParams();
    const navigate = useNavigate();


    const handleRating = (value) => {
        setStar(value); // 선택한 별점을 상태로 설정
    };

    const evaluateDealFunc = async() => {
        const response = await axios.post("http://localhost:9090/item/evaluate",{
            id : itemId, star
        },{ withCredentials: true });
        if(response.status == 200){
            alert("평가해주셔서 감사합니다.");
            navigate("/item/list");
        }
    }

    return (
        <div>
            <h1>거래 완료</h1>
            <p>거래에 대해 평가해주세요.</p>

            <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", gap: "5px" }}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        key={value}
                        onClick={() => handleRating(value)}
                        style={{
                            fontSize: "2rem",
                            cursor: "pointer",
                            color: value <= star ? "gold" : "gray",
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>

            <p>선택한 별점: {star}</p>
            <button
                onClick={evaluateDealFunc}
                style={{ marginTop: "10px" }}
            >
                제출
            </button>
        </div>
    );
};

export default DealCompleteComponent;