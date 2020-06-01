const fs = require('fs');

function getFromJson() {
    try {
        const packageJson = JSON.parse(fs.readFileSync('./package.json'));
        return packageJson.jira;
    } catch {
        throw new Error('Could not find a "jira" field in your package.json')
    }
}

function getCommitMessage() {
    try {
        const filePath = process.env.HUSKY_GIT_PARAMS;
        return fs.readFileSync(filePath).toString();
    } catch {
        throw new Error('Husky or jira-commit-lint could not find your commit message - are you using the right hook?')
    }
}

function regexEscape(str) {
    const newString = str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    if (newString !== str) {
        return newString;
    }
    throw new Error('Issue tags should be separated by square brackets');
}

function regexNumbers(str) {
    const newString = str.replace('-n\\]', '-[0-9]+]');
    if (newString !== str) {
        return newString;
    }
    throw new Error('Issue tags should end with the substring "-n]"');
}

function regexListItem(str) {
    return `${str}[ ,]*`;
}

function printEach(lines) {
    lines.forEach((line) => {
        console.log(`\t${line}`);
    });
}

module.exports = {
    getFromJson,
    getCommitMessage,
    regexEscape,
    regexNumbers,
    regexListItem,
    printEach,
};
