const yargs = require('yargs');
const prompt = require('prompt-sync')({ sigint: true });
const accounts = require('./accounts.js');

const argv = yargs.version().usage('Usage: app.js <command> [options]')
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
    .demandCommand(1, 'you need at leats one command before moving on')
    .help('h').alias('h', 'help')
    .argv;

const command = argv._[0];

if (command === 'add') {
    var account = {};
    account.title = prompt('Title: ').trim();
    account.username = prompt('Username: ').trim();
    var validTyping = false;
    while (validTyping === false) {
        account.password = prompt('Password: ', { echo: '*' }).trim();
        account.passwordConfirmation = prompt('Retype password: ', { echo: '*' }).trim();
        if (account.password === account.passwordConfirmation) {
            validTyping = true;
        } else {
            console.log('\nPasswords do not match. Try again');
        }
    }
    account.email = prompt('email: ').trim();
    account.websites = prompt('Websites: ').trim();
    account.notes = prompt('Notes: ').trim();
    console.log('Are you sure? (Y|N) ');
    const sure = prompt().trim();
    if (sure.toLowerCase() === 'y' || sure.toLowerCase() === 'yes') {
        console.log('Adding new account...', account);
        const accountAdded = accounts.addAccount(account);
        if (accountAdded) {
            console.log('Account added');
        } else  {
            console.log('Somenthing went wrong. Error saving account');
        }
    } else {
        console.log('Abort');
    }
} else if (command === 'list') {
    var allAccounts = accounts.getAll();
    console.log(`Printing ${allAccounts.length} account(s).`);

    // Forma 1
    /* for (let i = 0; i <= allAccounts.length - 1; i++) {
        accounts.logAccount(allAccounts[i]);
    } */

    // Alternativamente (modo recomendado cuando ya se tiene el arreglo)
    /* allAccounts.forEach((account) => {
        accounts.logAccount(account);
    }); */
    
    // Otra forma alternativa
    let index = 0;
    while (index <= allAccounts.length - 1) {
        accounts.logAccount(allAccounts[index]);
        index++;
    }

} else if (command === 'read') {
    let title;
    if (argv.title != undefined) {
        title = argv.title.trim();
    } else {
        title = prompt('Title: ').trim();
    }
    var account = accounts.getAccount(title);
    // undefined -parsea a-> false
    // null -parsea a-> false
    // '' -parsea a-> false
    // {} -parsea a-> true
    // [] -parsea a-> false
    // [1] -parsea a-> true
    // 'a' -parsea a-> true
    if (account) {
        accounts.logAccount(account);
    } else {
        console.log('Account not found');
    }
} else if (command === 'remove') {
    let title;
    if (argv.title != undefined) {
        title = argv.title.trim();
    } else {
        title = prompt('Title: ').trim();
    }
    var accountRemoved = accounts.removeAccount(title);
    var message = accountRemoved ? 'Account removed' : 'Account not found';
    console.log(message);
} else if (command === 'search') {
    let title;
    if (argv.title != undefined) {
        title = argv.title.trim();
    } else {
        title = prompt('Title: ').trim();
    }
    var accountsFound = accounts.searchAccount(title);
    if (accountsFound.length > 0) {
        for (let i = 0; i < accountsFound.length; i++) {
            accounts.logAccount(accountsFound[i]);
        }
    } else {
        console.log('No accounts found');
    }
}
