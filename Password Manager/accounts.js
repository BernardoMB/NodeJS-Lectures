const fs = require('fs');
const moment = require('moment');

var addAccount = (account) => {
    var accounts = fetchAccounts();
    var toBeSavedAccount = {
        Title: account.title,
        Username: account.username,
        Password: account.password,
        Email: account.email,
        Websites: account.websites,
        Notes: account.Notes,
        Created: moment().format(),
        Updated: moment().format()
    };
    accounts.push(toBeSavedAccount);
    saveAccounts(accounts);
    return toBeSavedAccount;
}

var fetchAccounts = () => {
    try {
        var accountsString = fs.readFileSync('accounts.json');
        var accountsInfo = JSON.parse(accountsString);
        return accountsInfo.accounts;
    } catch (e) {
        return [];
    }
}

var saveAccounts = (accounts) => {
    try {
        var accountsString = fs.readFileSync('accounts.json');
        var accountsInfo = JSON.parse(accountsString);
        accountsInfo.accounts = accounts;
        fs.writeFileSync('accounts.json', JSON.stringify(accountsInfo));
    } catch (e) {
        var accountsInfo = {
            accounts
        };
        fs.writeFileSync('accounts.json', JSON.stringify(accountsInfo));
    }
}

var getAll = () => {
    return fetchAccounts();
};

var logAccount = (account) => {
    console.log('Account: ', JSON.stringify(account, undefined, 2));
};

var getAccount = (title) => {
    var accounts = fetchAccounts();
    var filteredAccounts = accounts.filter((account) => {
        // Filter regresa un arreglo con todos los elementos que cumplan la siguiente condicion:
        return account.Title === title;
    });
    // Alternativamente
    // var filteredAccounts = accounts.filter((account) => account.Title === title);
    return filteredAccounts[0];
}

var removeAccount = (title) => {
    var accounts = fetchAccounts();
    var filteredAccounts = accounts.filter((account) => account.Title !== title);
    saveAccounts(filteredAccounts);
    return accounts.length !== filteredAccounts.length;
}

var searchAccount = (title) => {
    var accounts = fetchAccounts();
    var filteredAccounts = accounts.filter((account) => account.Title.toLowerCase().includes(title.toLowerCase()));
    return filteredAccounts;
}

module.exports = {
    addAccount,
    fetchAccounts,
    saveAccounts,
    getAll,
    logAccount,
    getAccount,
    removeAccount,
    searchAccount
}