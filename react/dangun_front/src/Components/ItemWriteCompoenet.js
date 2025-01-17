import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const Category = styled.div`
  font-size: 12px;
  border: 1px solid black;
  border-radius: 16px;
  padding: 8px 10px;
  user-select: none;
  cursor: pointer;
  margin-right: 7px;
  margin-bottom: 5px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  background-color: ${(props) => props.backgroundColor || 'white'};
`;

const PriceInput = styled.input`
  border: 1px solid black;
  border-radius: 3px;
  width: 400px;
  height: 30px;
  font-weight: bold;
  padding: 0 7px;
  margin-top: 9px;
  &::-webkit-inner-spin-button {
  appearance: none;
  }
`;

function ItemWriteComponent() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [country, setCountry] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState('');
  const [clickedCategoryIndex, setClickedCategoryIndex] = useState('');
  const [transactionMethod, setTransactionMethod] = useState('');
  const [img_src, setImg_src] = useState('');
  const [multifile, setMultifile] = useState({});
  const [selectedFiles, setSelectedFiles] = useState(0);
  const [categories, setCategories] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const fileInput = React.useRef(null);

  const writeItems = function() {
    if(img_src === '') {
      alert("이미지를 선택해주세요.");
    } else if (title === '') {
      alert("제목을 입력해주세요.");
    } else if (category === '') {
      alert("카테고리를 선택해주세요.");
    } else if (transactionMethod === '') {
      alert("거래방식을 선택해주세요.");
    } else if (price === '') {
      alert("가격을 입력해주세요.");
    } else if (contents === '') {
      alert("물품 설명을 입력해주세요.");
    } else if (country === '') {
      alert("거래 희망 장소를 입력해주세요.");
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('country', country);
      formData.append('contents', contents);
      formData.append('category', category);
      formData.append('multifile', multifile);
      axios({
        url: 'http://localhost:9090/item/write',
        method: 'post',
        data: formData,
      });
      alert("등록을 완료했습니다.");
    }
  };

  const fileSelect = function() {
    fileInput.current.click();
  };

  const fileChange = function(e) {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    if(file !== undefined) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
    } else {
      setImgPreview('');
    }
    setImg_src(e.target.value);
    setMultifile(e.target.files[0]);
    setSelectedFiles(e.target.files.length);
  }

  const loadCategories = function() {
    axios({
      url: 'http://localhost:9090/item/category',
      method: 'get'
    })
    .then(function(response) {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    loadCategories();
  }, [])

  return <div style={{width:"416px"}}>
    <h1>내 물건 팔기</h1>
    <form>
      <input type="file" value={img_src} onChange={fileChange} ref={fileInput} accept="image/*" style={{display:"none"}}/>
      <div style={{display:"flex"}}>
        <div style={{width:"50px", height:"50px", border:"1px solid black", borderRadius:"7px", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginBottom:"12px", cursor:"pointer", marginRight:"10px"}} onClick={fileSelect}>
          <div style={{fontSize:"20px", userSelect:"none"}}>📷</div>
          <div style={{fontSize:"12px", userSelect:"none"}}>{selectedFiles}/1</div>
        </div>
        <img src={imgPreview? imgPreview : "https://placehold.co/50x50"} style={{width:"50px", height:"50px", objectFit:"cover", paddingTop:"1px", userSelect:"none"}} alt="선택한 이미지" />
      </div>
      <Title>제목</Title>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{border:"1px solid black", borderRadius:"3px", width:"400px", height:"30px", fontWeight:"bold", padding:"0 7px", marginTop:"10px"}} placeholder="제목" /><br />
      <div style={{width:"416px", display:"flex", flexFlow:"wrap", marginTop:"10px", marginBottom:"20px"}}>
        {
          categories === '' ? null:
          categories.map((item, idx) => {
            return <Category key={`category${idx}`} onClick={e => {setCategory(e.target.innerText); setClickedCategoryIndex(`${idx}`);}} fontWeight={clickedCategoryIndex === `${idx}` && "bold"} backgroundColor={clickedCategoryIndex === `${idx}` && "#cfd3de"}>{item}</Category>;
          })
        }
      </div>
      <Title>거래방식</Title>
      <div style={{display:"flex", marginTop:"10px"}}>
        <Category onClick={e => setTransactionMethod(0)} fontWeight={transactionMethod === 0 && "bold"} backgroundColor={transactionMethod === 0 && "#cfd3de"}>판매하기</Category>
        <Category onClick={e => setTransactionMethod(1)} fontWeight={transactionMethod === 1 && "bold"} backgroundColor={transactionMethod === 1 && "#cfd3de"}>나눔하기</Category>
      </div>
      <PriceInput type="number" placeholder="₩ 가격을 입력해 주세요." value={price} onChange={(e) => setPrice(e.target.value)}/><br />
      <div style={{display:"flex", alignItems:"center", marginTop:"5px", marginBottom:"20px"}}>
        <input type="checkbox" style={{width:"18px", height:"18px", accentColor:"#ff6f0f"}}/>
        <div style={{fontSize:"14px", fontWeight:"bold"}}>가격 제안 받기</div>
      </div>
      <Title>자세한 설명</Title>
      <textarea rows="7" cols="50" value={contents} style={{width:"400px", padding:"7px 7px", fontWeight:"bold", resize:"none", border:"1px solid black", borderRadius:"3px", marginTop:"10px"}} onChange={(e) => setContents(e.target.value)} /><br />
      <div style={{fontSize:"13px", cursor:"pointer", userSelect:"none", width:"100px", height:"30px", lineHeight:"30px", textAlign:"center", fontWeight:"bold", border:"1px solid black", borderRadius:"5px", marginBottom:"20px"}}>자주 쓰는 문구</div>
      <Title>거래 희망 장소</Title>
      <input type="text" style={{border:"1px solid black", borderRadius:"3px", width:"400px", height:"30px", fontWeight:"bold", padding:"0 7px", marginTop:"10px", marginBottom:"20px"}} placeholder="ex) 인천 미추홀구" value={country} onChange={(e) => setCountry(e.target.value)} /><br />
      {/* <label htmlFor="writer">작성자</label>
      <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} /><br /> */}
    </form>
    <button onClick={writeItems} style={{width:"416px", height:"35px", backgroundColor:"#ff6f0f", color:"white", fontSize:"15px", fontWeight:"bold", border:"none", borderRadius:"7px", cursor:"pointer"}}>작성 완료</button>
  </div>;
}

export default ItemWriteComponent;