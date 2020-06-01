const { noCase } = require('change-case')
const utils = require('./utils')

const commitMessage = utils.getCommitMessage()
const tags = utils.getFromJson()

const checks = require('./checks')
// there is also a prepare-commit hook. You could check branch name and add issues is you find them, or just tell users to use a package for that. 

require('colors')

const tick = "✓".bold.green
const cross = "x".bold.red

let exitCode = 0
const results = [""]
const reconstructedMessage = []

function checkContent(criteria) {
    criteria.forEach(criterion => {
        const checkName = noCase(criterion.name)
        try {
            const verdict = criterion(commitMessage, tags)
            if (!verdict.verdict) {
                reconstructedMessage.push(`<${checkName}>`)
                results.push(`${cross} Message does not contain ${checkName}`)
                if (verdict.info) { results.push(`\t${verdict.info}`) }
                exitCode = 1
            } else {
                reconstructedMessage.push(verdict.match)
                results.push(`${tick} Message contains ${checkName}`)
            }
        } catch(error) {
            reconstructedMessage.push(`<${checkName}>`)
            results.push(`${cross} Parsing error: ${error}`) 
            exitCode = 1;
        }
    })
}

function checkOrder() {
    const newMessage = reconstructedMessage.join("")
    if (commitMessage.trim() === newMessage.trim()) {
        results.push(`${tick} commit order is correct`)
        return
    }
    results.push("")
    results.push('---')
    results.push("")
    results.push(`${cross} Final string does not match`)
    results.push("")
    results.push("\tBased on analysis of the message,")
    results.push(`\tExpected: ${newMessage.trim()}`.green)
    results.push(`\tReceived: ${commitMessage.trim()}`.red)
    results.push("")
    exitCode = 1
}


function testRunner(criteria) {
    checkContent(criteria)
    checkOrder({commitMessage, reconstructedMessage})
    if (exitCode) { utils.printEach(results) }
    process.exit(exitCode)
}



testRunner(checks)


// TODO: actually write some of the check functions
// TODO: test the tests
// TODO: be more stringent about scope and purity. Think of the tests!
// TODO: if you can't do better for bad matches than nothing, get rid of verdict.verdict and just use verdict.match
// TODO: add list of valid commands to package.json
// TODO: find out if square brackets are necessary in smart commits 