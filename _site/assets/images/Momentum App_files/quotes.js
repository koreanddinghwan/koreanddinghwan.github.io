const quotes = [{
    quote: "일이 잘못되면 군자는 제 탓을 하고, 소인은 남을 탓한다.",
    author: "공자",
},
{
    quote: "배우기만 하고 생각하지 않으면 얻는 것이 없고, 생각만 하고 배우지 않으면 위태로우니라.",
    author: "공자",
},
{
    quote: "남들이 나를 알아주지 않는다고 걱정하지 말고, 내가 능력이 없음을 걱정하라",
    author: "공자",
},
{
    quote: "진정한 앎은 자신이 얼마나 모르는 지를 아는 것이니라",
    author: "공자",
},
{
    quote: "정도의 차이이지 잘못된 것은 똑같이 잘못된 것이다.",
    author: "맹자",
},
{
    quote: "어진 사람에게는 적이 없다. 안으로 잘하면 밖으로 잘한다.",
    author: "맹자",
},
{
    quote: "사람들이 말을 쉽게 하는 것은 책임을 지지 않는 것을 의미한다.",
    author: "맹자",
},
{
    quote: "소문은 현명한 자에 이르러 멈추게 된다.",
    author: "순자",
},
{
    quote: "근본이 성실한 사람은 항상 안정되고 이익을 보지만, 근본이 방탕한 사람은 항상 위태롭고 손해를 보게 된다.",
    author: "순자",
},
{
    quote: "아는 것을 안다고 하고 모르는 것을 모든다고 하는 것이 말의 근본이니라.",
    author: "순자",
},
{
    quote: "어리석은 자는 무엇이든 자기의 뜻대로 일을 처리해 버리기 때문에 현자에게 의논하려고 하지 않는다.",
    author: "순자",
},
{
    quote: "누구라도 나를 충고해 주고 결점을 알맞게 지적해 주는 자가 있다면 그야말로 마땅히 스승으로서 존경해야할 사람인 것이다.",
    author: "순자",
}
]

function randomNum(min, max) {
    const randNum = Math.floor(Math.random()*(max-min+1)) + min;
    return randNum;
}


const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")

const quoteNum = randomNum(0,quotes.length-1)
console.log(quoteNum)
console.log(quotes[0,quoteNum])