const fs = require('fs')
const commitPath = process.argv.find(filePath => filePath === '.git/COMMIT_EDITMSG')
const commitMessage = fs.readFileSync(commitPath).toString()

function testRunner(checks) {
    let exitCode = 0
    const results = []
    const reconstructedMessage = []
    checkContent({checks, results, reconstructedMessage})
    checkOrder({commitMessage, reconstructedMessage})
    exitCode && printEach(results)
    process.exit(exitCode)
}

function checkContent({checks, results, reconstructedMessage}) {
    checks.forEach(check => {
        const checkName = check.name.split("-").join(" ")
        try {
            const messagePart = check(commitMessage)
            if (!messagePart) {
                reconstructedMessage.push(`<${checkName}>`)

                results.push(`1 Message does not contain ${checkName}`)    
                 // TODO: add extra messages, accessed through object like command: `\tvalid commands are x y z`, and log its output here. Key should be check.name
                exitCode = 1
            } else {
                reconstructedMessage.push(messagePart)
                results.push(`0 Message contains ${checkName}`)
            }
        } catch {
            exitCode = 1;
        }
    })
}

function checkOrder({commitMessage, reconstructedMessage}) {
    const newMessage = reconstructedMessage.join("")
    if (commitMessage === newMessage) {
        results.push("1 commit order is correct")
        return
    }
    results.push('---')
    results.push('0 order is incorrect')
    results.push('\texpected vs actual:')
    results.push(`\t0 ${reconstructedMessage}`)
    results.push(`\t1 ${commitMessage}`)
    exitCode = 1
}

function printEach(arguments) {
    arguments.forEach(argument => {
        console.log(argument)
    })
}


// testRunner('checks')


// TODO: actually write some of the test functions
// TODO: think about imports, scope, closures and mutation - do you really want all of this in one file?
// TODO: replace ones and zeros with emojis using node package
// TODO: colorise output using node package
// TODO: test the tests