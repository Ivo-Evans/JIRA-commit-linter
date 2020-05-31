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
const { noCase } = require('change-case')

function testRunner(checks) {
    checkContent({checks, results, reconstructedMessage})
    checkOrder({commitMessage, reconstructedMessage})
    exitCode && printEach(results)
    process.exit(exitCode)
}

function checkContent({checks, results, reconstructedMessage}) {
    checks.forEach(check => {
        const checkName = noCase(check.name)
        try {
            const verdict = check(commitMessage, tags)
            if (!verdict.verdict) {
                reconstructedMessage.push(`<${checkName}>`)
                results.push(`${cross} Message does not contain ${checkName}`)
                verdict.info && results.push("\t" + verdict.info)    
                exitCode = 1
            } else {
                reconstructedMessage.push(verdict.match)
                results.push(`${tick} Message contains ${checkName}`)
            }
        } catch(error) {
            reconstructedMessage.push(`<${checkName}>`)
            results.push(`${cross} Parsing error: ${error}`) // if command but no message, throw an error; if no command, throw a different error
            exitCode = 1;
        }
    })
}

function checkOrder({commitMessage, reconstructedMessage}) {
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

function printEach(arguments) {
    arguments.forEach(argument => {
        console.log("\t" + argument)
    })
}


testRunner(checks)


// TODO: actually write some of the check functions
// TODO: test the tests
// TODO: be more stringent about scope and purity. Think of the tests!