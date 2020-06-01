/*
can get git commit message
can get commit message when run from a local directory like node_modules/x/

// package.json
can get tag pattern
can get tag pattern when run from a local directory like node_modules/x/



// specific command validation
accepts valid commands
rejects invalid commands
accepts multiple commands
rejects multiple commands if some are invalid
accepts arguments to multiple commands

accepts comments that follow commands
rejects commits with no comment



rejects with useful message << should be factored in to every individual rejects test

testrunner catches errors appropriately

checkOrder is not pedantic about whitespace
checkOrder correctly compares an array of parts with a whole

// an ambitious testing plan
tests create a directory and a repo with a git subtree << no subtree, just a git repo in a gitignored folder
then each one:
causes a change to the filesystem
does a commit
reads the commit history to see if the commit went through
// before each and after each in jest to make and init and destroy the folder
https://stackoverflow.com/questions/786376/how-do-i-run-a-program-with-a-different-working-directory-from-current-from-lin

// another part of an ambitious testing plan
test mocks the installed environment by copying src into a new dir inside tests called node_modules, and by copying package.json into tests. Does all the tests then deletes the files

a quick experiment with exec from node core's child_process tells me that you can cd but that cd's don't persist between method calls, so exec('mkdir test && cd test && touch file') works, but exec('pwd', (err, stdout, stdin) => {console.log(stdout)}) will print the parent dir not test

also exec_sync might be more appropriate


could test with this:
- top level integration test (lint-commit)
- 

*/