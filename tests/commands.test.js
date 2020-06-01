const [ , commands ] = require('../src/checks');

test('allows a commit with a comment command', () => { 
    const verdict = commands('#comment this is a comment')
    expect(verdict.match).toBe('#comment this is a comment')
})

test('does not return the issue number if the issue number is at the beginning', () => {
    // should allow issue numbers in comments
    const verdict = commands('[JIRA-1] #comment this is a comment')
    expect(verdict.match).toBe('#comment this is a comment')
    
})

test('allows a commit with an in-progress command and a comment', () => {
    const verdict = commands('#in-progress this is a comment')
    expect(verdict.match).toBe('#in-progress this is a comment')

})

test('allows commits with multiple commands', () => {
    const verdict = commands('#comment this is a comment #close')
    expect(verdict.match).toBe('#comment this is a comment #close')
})


test('rejects a commit with no command', () => {
    const verdict = commands('this is a comment')
    
    expect(verdict.match).toBe(null)
    expect(verdict.info).toMatch("You must provide at least one command, starting with #")
    expect(verdict.info).toMatch("If all you want to do is write a comment, your command should be #comment (followed by your comment).")
    expect(verdict.info).toMatch("Two common actions are #in-progress and #done.")
})
