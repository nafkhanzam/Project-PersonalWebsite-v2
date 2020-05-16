import dynamo from "dynamodb";
import Joi from "joi";
import credentials from "../credentials.json";

dynamo.AWS.config.update(credentials);

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