import dynamo from "dynamodb";
import Joi from "joi";

let key = process.env.AWS_ACCESS_ID;
let keyRes = "";

if (key) {
    for (let i = 0; i < key.length; i += 2) {
        keyRes += key[i];
    }
}

const configs = {
    region: process.env.REGION,
    accessKeyId: keyRes,
    secretAccessKey: process.env.AWS_SECRET_ID
};

dynamo.AWS.config.update(configs);

export const QuizQuestion = dynamo.define("quizQuestion", {
    tableName: "quizQuestion",
    hashKey: "id",
    timestamps: false,
    schema: {
        id: Joi.string().required(),
        titleId: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string(),
        questions: Joi.array().items({
            question: Joi.string().required(),
            answers: Joi.array().items(Joi.string()).length(4).required(),
        }),
    },
});

export const QuizAnswer = dynamo.define("quizAnswer", {
    tableName: "quizAnswer",
    hashKey: "id",
    timestamps: true,
    schema: {
        id: Joi.string().required(),
        questionId: Joi.string().required(),
        name: Joi.string(),
        answers: Joi.array().required(),
        corrects: Joi.number().required()
    },
});