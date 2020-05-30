const fs = require('fs')
const commitPath = process.argv.find(filePath => filePath === '.git/COMMIT_EDITMSG')
const commitMessage = fs.readFileSync(commitPath).toString()

let exitCode = 0

function testRunner(tests) {
    const results = []
    const reconstructedMessage = []
    checkContent({tests, results, reconstructedMessage})
    checkOrder({commitMessage, reconstructedMessage})
    exitCode && printEach(results)
    process.exit(exitCode)
}

function checkContent({tests, results, reconstructedMessage}) {
    tests.forEach(test => {
        try {
            const messagePart = test()
            if (!messagePart) {
                reconstructedMessage.push(`<${test.name}>`)
                results.push(`1 Message contains ${test.name}`)    
                exitCode = 1
            } else {
                reconstructedMessage.push(messagePart)
                results.push(`0 Message does not contain ${test.name}`)
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
    results.push('\t0 order is incorrect')
    results.push('\texpected vs actual')
    results.push(`\t0 ${reconstructedMessage}`)
    results.push(`\t1 ${commitMessage}`)
    exitCode = 1
    return
}

function printEach(arguments) {
    arguments.forEach(argument => {
        console.log(argument)
    })
}


testRunner('tests')
