console.log('Starting app');

var firstCallback = () => {
    console.log('Executing code inside callback');
    console.log('This log is inside of some execution block after 5 seconds');

}

setTimeout(firstCallback, 8000);

var secondCallback = () => {
    console.log('Second callback');
}

setTimeout(secondCallback, 0);

console.log('Finishing up');
