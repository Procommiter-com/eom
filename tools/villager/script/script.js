const headImgArr = [
    "./imgs/head/Villager.png",
    "./imgs/head/wandering-trader.png",
    "./imgs/head/piglin.png"
];
let indexHeadImgArr = 0;

function changeHead(imgElement) {
    indexHeadImgArr = (indexHeadImgArr + 1) % headImgArr.length;
    imgElement.src = headImgArr[indexHeadImgArr];

    const siteBlock = document.querySelector(".SiteBlock");
    siteBlock.style.display = indexHeadImgArr === 0 ? "flex" : "none";
}

async function ShowTradeList(job) {
    const tradeListDiv = document.getElementById("trade_list");

   // 외부 JSON 파일 불러오기
    fetch("./data/trade_list.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {

        // 예시: Blast_Furnace 데이터를 출력
        console.log("Blast_Furnace Data:", data.Blast_Furnace);

    })
    .catch(error => {
        console.error("Error loading JSON:", error);
    });

}
