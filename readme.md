

[![codecov](https://codecov.io/gh/Ivo-Evans/JIRA-commit-linter/branch/master/graph/badge.svg)](https://codecov.io/gh/Ivo-Evans/JIRA-commit-linter)
[![Build Status](https://travis-ci.org/Ivo-Evans/JIRA-commit-linter.svg?branch=master)](https://travis-ci.org/Ivo-Evans/JIRA-commit-linter)


jira-commmit-linter

An opinionated commit linter for the Jira smart-commit syntax.

This tool is designed to be used with [husky](https://www.npmjs.com/package/husky) to help you integrate Jira with Github or another Git repository hosting service. 

Commits made with the smart-commit syntax can update the Jira project board.  

Install jira-commit-linter with


// list of valid prefixes - in package.json??

Use it with Husky by placing this in your package.json:


For instructions on connecting Jira and Github, go [here]().