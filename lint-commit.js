const fs = require('fs')

const commitMessage = fs.readFileSync(process.env.HUSKY_GIT_PARAMS).toString()
const checks = require('./checks')
const tags = ['[TEST-1]', '[TEST-2]'] // you would actually get these from package.json, and only get one, [TEST-n]

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
    results.push(`${cross} Final commit does not match`)
    results.push(`\texpected |${newMessage.trim().green}`)
    results.push(`\tactual   |${commitMessage.trim().red}`)
    exitCode = 1
}

function printEach(arguments) {
    arguments.forEach(argument => {
        console.log("\t" + argument)
    })
}


testRunner(checks)


// TODO: actually write some of the test functions
// TODO: think about imports, scope, closures and mutation - do you really want all of this in one file?
// TODO: replace ones and zeros with emojis using node package
// TODO: colorise output using node package
// TODO: test the tests