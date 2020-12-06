const alphabet = new Array('z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1)
    .fill(null)
    .map((_, idx) => String.fromCharCode('a'.charCodeAt(0) + idx));

const getQuestionsAnyoneAnsweredYes = (input) =>
    [...input, ''].reduce(({questions, count}, val) =>
        !val
            ? ({
                questions: new Set(),
                count: count + questions.size
            })
            : ({
                questions: new Set([...questions, ...val.split("")]),
                count
            }), {
        questions: new Set(),
        count: 0
    }).count;

const getQuestionsEveryoneAnsweredYes = (input) =>
    [...input, ''].reduce(({questions, count}, val) =>
        !val
            ? ({
                questions: alphabet,
                count: count + questions.length
            }) : ({
                questions: val.split("").filter(x => questions.includes(x)),
                count
            }), {
        questions: alphabet,
        count: 0
    }).count;

exports.getQuestionsEveryoneAnsweredYes = getQuestionsEveryoneAnsweredYes;
exports.getQuestionsAnyoneAnsweredYes = getQuestionsAnyoneAnsweredYes;
