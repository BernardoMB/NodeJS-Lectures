var one = "one";

function tow () {
    var number = "two";
    return number;
}

global.three = "three: 3";


var four = function() {
    var number = "four";
    return number;
}


global.four = four;

exports.five = 'five';

module.exports.six = "six";

exports.seven = function() {
    return 'seven';
}