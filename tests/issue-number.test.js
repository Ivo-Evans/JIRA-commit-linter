const [ issueNumber ] = require('../checks')
// TODO: add info validation to tests
test('issueNumber approves a single valid tag', () => {
    const verdict = issueNumber(
        '[JIRA-14] hello this is golledygook', ['[JIRA-n]']
    )
    expect(verdict.match).toBe('[JIRA-14] ')
})

test('issueNumber approves multiple valid tags with different numbers', () => {
    const verdict = issueNumber(
        '[JIRA-1], [JIRA-5000000000000] some random text', ['[JIRA-n]']
    )
    expect(verdict.match).toBe('[JIRA-1], [JIRA-5000000000000] ')
})

test('issueNumber approves multiple valid tags with different keys', () => {
    const verdict = issueNumber(
        '[JIRA-2], [TEST-4] #comment my comment', ['[JIRA-n]', '[TEST-n]']
    )
    expect(verdict.match).toBe('[JIRA-2], [TEST-4] ')
})

test('issueNumber rejects a message containing no tags', () => {
    const verdict = issueNumber(
        '#comment just a comment', ['[JIRA-n]']
    )    
    expect(verdict.match).toBe(null)
    expect(verdict.verdict).toBe(false)
})

test('issueNumber rejects a message containing only invalid tags', () => {
    const verdict = issueNumber(
        '[JIRA-64] #close', ['[TEST-n]']
    )
    expect(verdict.match).toBe(null)
    expect(verdict.verdict).toBe(false)
})

test('issueNumber selects only the valid tags from a set of mixed tags', () => {
    const verdict = issueNumber(
        '[JIRA-2], [TEST-4] #comment my comment',
        ['[JIRA-n]']
    )
    expect(verdict.match).toBe('[JIRA-2], ')
})

test('issueNumber does not differentiate between space and comma-separated lists of tags', () => {
    const verdict = issueNumber(
        '[JIRA-2], [JIRA-4] [JIRA-8] [JIRA-16], [JIRA-32] #comment my comment',
        ['[JIRA-n]']
    )
    expect(verdict.match).toBe('[JIRA-2], [JIRA-4] [JIRA-8] [JIRA-16], [JIRA-32] ')
})

test('issueNumber informs the user if it has no tags to use as parameters', () => {
  const verdict = issueNumber(
      '[JIRA-1] #comment something'
  )

  const goodInfo = "tags must be specified in your package.json under the field \'jira\' as an array of strings. Each string should contain a tag formatted like '[JIRA-n]', beginning with your project key and ending with n"

  expect(verdict.match).toBe(null)
  expect(verdict.verdict).toBe(false)
  expect(verdict.info).toBe(goodInfo)
})


test('issueNumber encounters an error if tags without square brackets are provided', () => {
    expect(() => {
        issueNumber(
            '[JIRA-1] #comment something', 
            ['[JIRA-n']
        ).toThrow('Issue tags should be separated by square brackets')
    })
})

test('issueNumber encounters an error if a number other than n is provided as a parameter', () => {
    expect(() => {
        issueNumber(
            '[JIRA-1] #comment something', 
            ['[JIRA-1']
        ).toThrow('Issue tags should end with the substring "-n]"')
    })
})
