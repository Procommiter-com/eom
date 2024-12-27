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
                newDiv1.style.backgroundImage = `url('/imgs/item/${jobData[i][j][0]}.png')`;
                newDiv1.classList.add('item_container');
                
                var newDiv2 = document.createElement('div');
                newDiv2.style.backgroundImage = `url('/imgs/item/${jobData[i][j][2]}.png')`;
                newDiv2.classList.add('item_container');
                
                var newDiv3 = document.createElement('div');
                newDiv3.style.backgroundImage = `url('/imgs/item/${jobData[i][j][4]}.png')`;
                newDiv3.classList.add('item_container');
    
                var p1 = document.createElement('p');
                p1.innerHTML = jobData[i][j][1];
                var p2 = document.createElement('p');
                p2.innerHTML = jobData[i][j][3];
                var p3 = document.createElement('p');
                p3.innerHTML = jobData[i][j][5];
               
                // 화살표
                var img1 = document.createElement('img');
                img1.src = "imgs/button/trade_arrow.png";


                newDiv1.appendChild(p1)
                newDiv2.appendChild(p2)
                newDiv3.appendChild(p3)


                newDiv.appendChild(newDiv1);
                newDiv.appendChild(newDiv2);
                newDiv.append(img1);
                newDiv.appendChild(newDiv3);
                

    
                document.querySelector("#trade_list").appendChild(newDiv);
            }

            var Divone = document.createElement('div')
            var ppp = document.createElement('p');
            Divone.appendChild(ppp);
            document.querySelector("#trade_list").appendChild(Divone);
        }
    })
    
    .catch(error => {
        console.error("Error loading JSON:", error);
    });

}
