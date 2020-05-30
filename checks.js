/*
GUIDANCE FOR WRITING YOUR OWN CHECKS
0. A check should check for a discrete, non-overlapping part of the message, and the checks should cumulatively cover every character of a succesful message
1. expect the whole commit message as an argument
2. return the matched part of the message if succesful, or a falsy value if unsuccesful
3. export the functions as an array representing their order
4. You can add an optional explanatory message in the comments object. This message will be printed if a check fails. The key must correspond exactly to the name of the failing function.
*/

function issue_numbers() {

}

function command() {

}

function comment() {

}

const explanations = {
    issue_numbers: "",
    command: "",
    comment: ""
}

module.exports = {
    checks: [issue_numbers, command, comment],
    explanations 
}

