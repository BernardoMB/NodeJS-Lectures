module.exports.add = (x, y) => x + y;
module.exports.square = x => x * x;
module.exports.setName = (user, fullName) => {
    const names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
}
module.exports.asyncAdd = (x, y, callback) => {
    setTimeout(() => {
        callback(x + y);
    }, 2000);
}