const fs = require('fs');
const moment = require('moment');

//const file = 'testAccounts.json';
const file = 'accounts.json';

var fetchAccounts = () => {
    try {
        var accountsString = fs.readFileSync(file);
        var accountsInfo = JSON.parse(accountsString);
        return accountsInfo.Accounts;
    } catch (e) {
        return [];
    }
};

var saveAccounts = (accounts) => {
    try {
        var accountsString = fs.readFileSync(file);
        var accountsInfo = JSON.parse(accountsString);
        accountsInfo.Accounts = accounts;
        fs.writeFileSync(file, JSON.stringify(accountsInfo));
    } catch (e) {
        var accountsInfo = {
            Updates: [new moment().format().toString()],
            Template: {
                Title: "",
                Username: "",
                Password: "",
                Email: "",
                Websites: "",
                Notes: "",
                AdditionalInfo: {},
                CreatedAt: ""
            },
            Accounts: accounts
        }
        fs.writeFileSync(file, JSON.stringify(accountsInfo));
    }
};

var addAccount = (data) => {
    var accounts = fetchAccounts();
    var account = {
        Title: data.title,
        Username: data.username,
        Password: data.password,
        Email: data.email,
        Websites: data.websites,
        Notes: data.notes,
        AdditionalInfo: data.additionalInfo,
        CreatedAt: moment().format()
    };
    var duplicateAccounts = accounts.filter(function (account) {
        return account.Title === data.title;
    });
    if (duplicateAccounts.length === 0) {
        accounts.push(account);
        saveAccounts(accounts);
        return account;
    }
};

var getAll = () => {
    return fetchAccounts();
};

var getAccount = (title) => {
    var accounts = fetchAccounts();
    var filteredAccounts = accounts.filter((account) => account.Title === title);
    return filteredAccounts[0];
};

var removeAccount = (title) => {
    var accounts = fetchAccounts();
    var filteredAccounts = accounts.filter((account) => account.Title !== title);
    saveAccounts(filteredAccounts);
    return accounts.length !== filteredAccounts.length;
};

var logAccount = (account) => {
    console.log('Account: ', JSON.stringify(account, undefined, 2));
};

var searchAccount = (title) => {
    var accounts = fetchAccounts();
    var filteredAccounts = accounts.filter((account) => account.Title.toLowerCase().includes(title.toLowerCase()));
    return filteredAccounts;
}

module.exports = {
    addAccount,
    getAll,
    getAccount,
    removeAccount,
    logAccount,
    searchAccount
};