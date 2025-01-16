export const timeCulFunc = (writeDate) => {
    if(!writeDate) return null;
    // 서버에서 받은 시간을 Date 객체로 변환
    const date = new Date(writeDate.replace(" ", "T")); // 공백을 ISO 형식으로 변환
    const now = new Date(); // 현재 시간

    // 시간 차이를 밀리초 단위로 계산
    const diffMs = now - date; // 밀리초 차이
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간 단위로 변환
     // 결과 업데이트
     if (diffHours < 1) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes}분 전`;
    } else {
        return `${diffHours}시간 전`;
    }

}
export const timeFormatFunc = () => {
    const now = new Date();
      const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate()
      ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
      return formattedTime;
}