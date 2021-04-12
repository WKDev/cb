//1. promise 

function fetchUser(){
    //do network request in 10 secs
    return  'ellie';
    //1. 이게 10초가 걸리면 

    return new Promise((resolve, reject)=>{
        // 리졸브와 리젝트라는 각각의 콜백함수를 받는 엑스큐터라는 콜백함수를 만들게 되었습니다. 
        // 이 코드블럭 안에 있는 것들이 비동기적으로 수행되었었다. 
        // 리졸브와 리젝트 호출 없이 그냥 리턴하면 프로미스는 pending상태가 되어 있다. 

        // 프로미스의 세 가지 상태 : pending , fulfilled, rejected
        // 아무것도 안하면 펜딩에서 멈추니, 꼭 프로미스 안에는 리졸브나 리젝트를 이용해서 표현해야 함.
        resolve("ellie");

    })

    //내가 언제 유저의 데이터를 받아올지 모르겠지만 내가 약속할게 이 프로미스라ㅡ는 오브젝트트 가지고 있음 여기에 니가 덴이라는 콜백함수만 등록해놓으면 유저 데이터가 준비되는대로 니가 등록한 콜백함수를 불러줄게! 
}


const user = fetchUser() // 2. javascript에서는 이걸 처리하는데 10초동안 여기 머무름

user.then(console.log) // 프로미스 사용시 프로미스가 fulfilled 되면 사용하는 형태


console.log(user)//3. 비동기적 처리 안하면 ui같은게 다음에 있다면 전혀 표현이 안됨. 


2. async
async function fetchUser(){
    // async를 쓰면 코드블럭이 자동으로 promise로 바뀜(=synthetic sugar)

}


const user = fetchUser() // 2. javascript에서는 이걸 처리하는데 10초동안 여기 머무름

user.then(console.log) // 프로미스 사용시 프로미스가 fulfilled 되면 사용하는 형태


console.log(user)//3. 비동기적 처리 안하면 ui같은게 다음에 있다면 전혀 표현이 안됨. 


3. await
// await은 async 함수 내에서만 사용 가능
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
    // 3초가 지나면 resolve를 호출하는 프로미스를 리턴함
}

async function getApple(){
    await delay(3000);
    return 'apple'
}

async function getBanana(){
    await delay(3000);
    return 'banana'
}

function getBanana(){
    return delay(3000)
    .then(()=>{'😆'}) // 이렇게 체인닝을 하는 것 보다 await을 사용해서 기다리게 할 수 있음

function pickFruits(){
    return getApple().then(apple=>{
        return getBanana()
        .then(banana=>'${apple} + ${banana}')
})
}

pickFruits().then(console.log)

=> 이거 완죠니 중첩하면 콜백 지옥아니냐?!

async function pickFruits(){
    const apple = await getApple();
    const banana = await getBanana();
    return '${apple} + ${banana}'
    
}