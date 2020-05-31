const fs = require ('fs')

function getFromJson() {
    const packageJson = JSON.parse(fs.readFileSync('./package.json'))
    return packageJson.jira
}

function getCommitMessage() {
    const filePath = process.env.HUSKY_GIT_PARAMS
    return fs.readFileSync(filePath).toString()
}

function regexEscape(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

module.exports = {getFromJson, getCommitMessage, regexEscape}