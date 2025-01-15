<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>토마토 | Main</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/resources/css/header.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/resources/css/main.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/resources/css/footer.css">
</head>
<body>
	<!-- header -->
    <div class="header">
        <button class="header_logo" onclick="window.location.href='${pageContext.request.contextPath}';">
            <img src="${pageContext.request.contextPath}/resources/images/01_logo/logo_01.jpg" alt="로고 이미지">
        </button>
        <div class="headermenu">
            <div class="banner">카테고리</div>
            <div class="banner-content">
                <a href="#">디지털기기</a>
                <a href="#">생활가전</a>
                <a href="#">가구/인테리어</a>
                <a href="#">생활/주방</a>
                <a href="#">유아동</a>
                <a href="#">유아도서</a>
                <a href="#">여성의류</a>
            </div>
        </div>
        <div class="headermenu">
            <div class="banner">부동산</div>
        </div>
        <div class="headermenu">
            <div class="banner">중고차</div>
        </div>
        <div class="headermenu">
            <div class="banner">알바</div>
        </div>
        <div class="headermenu">
            <div class="banner">동네업체</div>
        </div>
        <div class="headermenu">
            <div class="banner">동네생활</div>
        </div>
        <div class="headermenu">
            <div class="banner">모임</div>
        </div>
        <!-- 로그인 / 회원가입 -->
        <div class="headermenu">
            <div class="usermenu" id="usermenu_first">로그인</div>
        </div>
        <div class="headermenu">
            <div class="usermenu">회원가입</div>
        </div>
    </div>
    
    <!-- main -->
	<div class="box_container">
	    <!-- 검색 -->
		<div class="box_item box_search">
			<input type="text" class="search_input" placeholder="검색어를 입력하세요">
			<button class="search_button">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_01.jpg" alt="검색 아이콘">
			</button>
		</div>
	    <!-- 인기 검색어 -->
		<div class="box_item box_suggest">
			인기 검색어
            <a href="#">굿즈</a>
            <a href="#">플스</a>
            <a href="#">닌텐도</a>
            <a href="#">다이슨</a>
            <a href="#">캠핑</a>
            <a href="#">포토카드</a>
            <a href="#">에어팟</a>
            <a href="#">스타벅스</a>
            <a href="#">달력</a>
            <a href="#">삼성</a>
            <a href="#">다이소</a>
            <a href="#">가습기</a>
            <a href="#">기프티콘</a>
            <a href="#">상품권</a>
            <a href="#">기프트카드</a>
            <a href="#">노트북</a>
            <a href="#">레고</a>
		</div>
	    <!-- slider -->
		<div class="box_item box_slider">	
        	<button class="slider_arrow left" onclick="moveToPrevSlide()">&#10094;</button>
	 		<div class="slider_track">	
	            <img src="${pageContext.request.contextPath}/resources/images/03_main/main_01.jpg" alt="메인이미지 1">
	            <img src="${pageContext.request.contextPath}/resources/images/03_main/main_02.jpg" alt="메인이미지 2">
	            <img src="${pageContext.request.contextPath}/resources/images/03_main/main_03.jpg" alt="메인이미지 3">
        	</div>
            <button class="slider_arrow right" onclick="moveToNextSlide()">&#10095;</button>
		</div>
		<!-- categoty -->
		<div class="box_item box_category_text">
			인기 카테고리
		</div>
		<div class="box_item box_category">
			<button class="category_btn">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_02.jpg" alt="시공 사례 아이콘 이미지">
				디지털기기
			</button>
			<button class="category_btn">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_03.jpg" alt="시공 사례 아이콘 이미지">
				생활가전
			</button>
			<button class="category_btn">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_04.jpg" alt="시공 사례 아이콘 이미지">
				가구/인테리어
			</button>
			<button class="category_btn">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_05.jpg" alt="시공 사례 아이콘 이미지">
				생활/주방
			</button>
			<button class="category_btn">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_06.jpg" alt="시공 사례 아이콘 이미지">
				유아동
			</button>
			<button class="category_btn">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_07.jpg" alt="시공 사례 아이콘 이미지">
				유아도서
			</button>
			<button class="category_btn">
				<img src="${pageContext.request.contextPath}/resources/images/02_icon/icon_08.jpg" alt="시공 사례 아이콘 이미지">
				여성의류
			</button>
		</div>
	</div>
	
	<!-- footer -->
	<div class="footer">
		<table>
			<tr><td>(주)토마토마켓</td></tr>
			<tr><td>대표 ooo | 사업자번호 000-00-00000</td></tr>
			<tr><td>직업정보제공사업 신고번호A0000000000000</td></tr>
			<tr><td>통신판매업 신고번호 0000-서울서초-0000</td></tr>
			<tr><td>호스팅 사업자 Amazon Web Service(AWS)</td></tr>
			<tr><td>주소 서울특별시 구로구 디지털로 000, 00층 (토마토서비스)</td></tr>
			<tr><td>전화 1544-0000 | 고객문의 cs@tomatoservice.com</td></tr>
		</table>
		<table>
			<tr><td><a href="#">이용약관</a></td><td><a href="#">개인정보처리방침</a></td><td><a href="#">운영정책</a></td><td><a href="#">위치기반서비스 이용약관</a></td><td><a href="#">이용자보호 비전과 계획</a></td><td><a href="#">청소년보호정책</a></td></tr>
		</table>
	</div>
	
	<!-- 슬라이드 동작 -->
	<script>
	let autoSlide;
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slider_track img");
    const totalSlides = slides.length;

    function showSlide(index) 
    {
        slides.forEach((slide, i) => 
        {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function moveToNextSlide() 
    {
	    clearInterval(autoSlide);
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
        autoSlide = setInterval(moveToNextSlide, 3000);
    }

    function moveToPrevSlide()
    {
	    clearInterval(autoSlide);
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
        autoSlide = setInterval(moveToNextSlide, 3000);
    }

    autoSlide = setInterval(moveToNextSlide, 3000);

    showSlide(currentSlide);
	</script>

</body>
</html>