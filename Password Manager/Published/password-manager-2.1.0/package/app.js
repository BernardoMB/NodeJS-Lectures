#!/usr/bin/env node

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
var prompt = require('prompt-sync')({
    sigint: true
});
const accounts = require('./accounts.js');

// Configuring yargs.
const argv = yargs
    .version()
    .usage('Usage: pwm <command> [options]')
    .command('add', 'Add a new account')
    .command('list', 'List all accounts')
    .command('read', 'Read an account', {
        title: {
            alias: 't',
            describe: 'The title of the account you want to see',
            demandOption: false
        }
    })
    .command('remove', 'Remove an account', {
        title: {
            alias: 't',
            describe: 'The title of the account you want to remove',
            demandOption: false
        }
    })
    .command('search', 'Search accounts', {
        title: {
            alias: 't',
            describe: 'The title of the account you want to search for',
            demandOption: false
        }
    })
    .example('pwm add', 'Add an account')
    .example('pwm list', 'List all accounts')
    .example('pwm search', 'Search for an account')
    .example('pwm search --title="<account title>', 'Search for an account')
    .demandCommand(1, 'You need at least one command before moving on')
    .help('h').alias('h', 'help')
    .argv;

// Get the command.
var command = argv._[0];

// Commands.
if (command === 'add') {
    var data = {};
    data.title = prompt('Title: ').trim();
    data.username = prompt('Username: ').trim();
    var validTyping = false;
    while (validTyping == false) {
        data.password = prompt('Password: ', {
            echo: '*'
        }).trim();
        data.password2 = prompt('Retype password: ', {
            echo: '*'
        }).trim();
        if (data.password == data.password2) {
            validTyping = true;
        } else {
            console.log('\nPasswords do not match. Try again\n');
        }
    }
    data.email = prompt('Email: ').trim();
    data.websites = prompt('Websites: ').trim();
    data.notes = prompt('Notes: ').trim();
    data.additionalInfo = prompt('Additional info: ').trim();
    console.log('Are you shure? (Y|N) ');
    var confirmationString = prompt().trim();
    if (confirmationString.toLowerCase() === 'yes' || confirmationString.toLowerCase() === 'y') {
        var account = accounts.addAccount(data);
        if (account) {
            console.log('Account added');
        } else {
            console.log('Something went wrong adding account');
        }
    } else {
        console.log('Abort');
    }
} else if (command === 'list') {
    var allAccounts = accounts.getAll();
    console.log(`Printing ${allAccounts.length} account(s).`);
    allAccounts.forEach((account) => {
        accounts.logAccount(account);
    });
} else if (command === 'read') {
    var title;
    if (argv.title != undefined) {
        title = argv.title.trim();
    } else {
        title = prompt('Title: ').trim();
    }
    var account = accounts.getAccount(title);
    if (account) {
        accounts.logAccount(account);
    } else {
        console.log('Account not found');
    }
} else if (command === 'remove') {
    var title;
    if (argv.title != undefined) {
        title = argv.title.trim();
    } else {
        title = prompt('Title: ').trim();;
    }
    var accountRemoved = accounts.removeAccount(title);
    var message = accountRemoved ? 'Account was removed' : 'Account not found';
    console.log(message);
} else if (command === 'search') {
    var title;
    if (argv.title != undefined) {
        title = argv.title.trim();
    } else {
        title = prompt('Title: ').trim();
    }
    var result = accounts.searchAccount(title);
    console.log(`Printing ${result.length} account(s).`);
    result.forEach((account) => {
        accounts.logAccount(account);
    });
}