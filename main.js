const slythrin = 5;
const hufflepuff = 10;

if (window.Worker){
    const myWorker = new Worker("sw.js");
    myWorker.postMessage([slythrin,hufflepuff]);
    console.log("Message posted on worker");

    myWorker.onmessage = (e) => {
        console.log({e})
        console.log(e.data)
    }
}else {
    console.log('Your browser doesn\'t support web workers.');
}
