/*
GUIDANCE FOR WRITING YOUR OWN CHECKS
0. A check should check for a discrete, non-overlapping part of the message, and the checks should cumulatively cover every character of a succesful message
1. expect the whole commit message as an argument
3. Checks should look for the presence of a substring and return an object with up to three keys: verdict (bool) info (helpful message) match (the match)
5. export the functions as an array representing their order
*/

const utils = require('./utils')


function issueNumber(message, tags) {
    if (!tags) {
        return {
            match: null,
            verdict: false,
            info: "tags must be specified in your package.json under the field \'jira\' as an array of strings. Each string should contain a tag formatted like '[JIRA-n]', beginning with your project key and ending with n"
        }
    }
    const newTags = tags.map(tag => { 
        const plainTags = utils.regexEscape(tag)
        const numericTags = utils.regexNumbers(plainTags)
        return utils.regexListItem(numericTags)
    }) 
    const regexString = "(" + newTags.join("|") + ")+"
    const match = message.match(regexString)
    const validatedMatch = match && match[0] 
    // match() returns an array when used like this. The first element is the match
    return { 
        match: validatedMatch,
        verdict: !!validatedMatch,
        info: "Put the rules for issue numbers here",
    }
}

function commands() {

}

module.exports = [issueNumber, commands]
