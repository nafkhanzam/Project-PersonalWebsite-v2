import { NowRequest, NowResponse } from "@now/node";
import { v1 as uuid } from "uuid";
import { QuizAnswer, QuizQuestion } from "./schema";

export default (req: NowRequest, res: NowResponse) => {
    const { titleId, name, answers } = req.body;
    QuizQuestion.scan().where("titleId").equals(titleId).exec((err, question) => {
        if (err) {
            return res.status(500).send(err);
        }
        question = question.Items[0].attrs;
        let corrects = 0;
        for (const a of answers) {
            const q = question.questions.find((v: any) => v.question === a.question);
            if (q && q.answers[0] === a.answer) {
                ++corrects;
            }
        }
        const answer = { id: uuid(), questionId: question.id, name, answers, corrects };
        QuizAnswer.create(answer, (err, answerResult) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.json(answerResult);
        });
        return null;
    });
}