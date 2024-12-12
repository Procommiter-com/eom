const headImgArr = [
    "./imgs/head/Villager.png",
    "./imgs/head/wandering-trader.png",
    "./imgs/head/piglin.png"
];
let indexHeadImgArr = 0;

function changeHead(imgElement) {
    document.querySelector("#trade_list").innerHTML = ""
    indexHeadImgArr = (indexHeadImgArr + 1) % headImgArr.length;
    imgElement.src = headImgArr[indexHeadImgArr];

    const siteBlock = document.querySelector(".SiteBlock");
    siteBlock.style.display = indexHeadImgArr === 0 ? "flex" : "none";

    if (indexHeadImgArr == 1){
        ShowTradeList("Wandering trader")
    }
    else if (indexHeadImgArr == 2){
        ShowTradeList("Piglin")
    }

}

async function ShowTradeList(job) {
    const tradeListDiv = document.getElementById("trade_list");
    let jobData = []
    document.querySelector("#trade_list").innerHTML = ""
   // 외부 JSON 파일 불러오기
    fetch("./data/trade_list.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        jobData = data[job];
        document.querySelector("#trade_list").innerHTML = ""
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < jobData[i].length; j++) {
                console.log(jobData[i][j]);  // 각 jobData[i][j] 항목 출력
    
                // 새 div 생성
                var newDiv = document.createElement('div');
                newDiv.classList.add('trade_element');

                var newDiv1 = document.createElement('div');
                newDiv1.classList.add('item_container');

                var newDiv2 = document.createElement('div');
                newDiv2.classList.add('item_container');
                
                var newDiv3 = document.createElement('div');
                newDiv3.classList.add('item_container');
    
                // wanted - 1
                var img1 = document.createElement('img');
                img1.src = `/imgs/item/${jobData[i][j][0]}.png`;
    
                var p1 = document.createElement('p');
                p1.textContent = jobData[i][j][1];
    
                // wanted - 2
                if (jobData[i][j][2]) {
                    var img2 = document.createElement('img');
                    img2.src = `/imgs/item/${jobData[i][j][2]}.png`;
    
                    var p2 = document.createElement('p');
                    p2.textContent = jobData[i][j][3];
                }
    
                // 화살표
                var img3 = document.createElement('img');
                img3.src = "imgs/button/trade_arrow.png";
    
                // given
                var img4 = document.createElement('img');
                img4.src = `/imgs/item/${jobData[i][j][4]}.png`;
    
                var p3 = document.createElement('p');
                p3.textContent = jobData[i][j][5];
    
                // 생성한 요소들을 div에 추가
                newDiv.appendChild(img1);
                // newDiv.appendChild(p1);
                if (jobData[i][j][2]) {  // img2와 p2가 있을 경우에만 추가
                    newDiv.appendChild(img2);
                    // newDiv.appendChild(p2);
                }
                newDiv.appendChild(img3);
                newDiv.appendChild(img4);
                // newDiv.appendChild(p3);
                
                // newDiv.appendChild(newDiv1);
                // newDiv.appendChild(newDiv2);
                // newDiv.appendChild(newDiv3);

                // 부모 요소에 newDiv 추가
                document.querySelector("#trade_list").appendChild(newDiv);
            }
        }
    })
    
    .catch(error => {
        console.error("Error loading JSON:", error);
    });

}
