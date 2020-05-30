const commitPath = process.argv.find(filePath => filePath === '.git/COMMIT_EDITMSG')
console.log(commitPath)
process.exit(1)