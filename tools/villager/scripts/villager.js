import data from "../data/trading.json"

function showTradingList(job){
    data[job]["Novice"].forEach(element => {
        element["wanted"]
        element["wanted_Amount"]
        element["given"]
        element["given_Amount"]
    });

}