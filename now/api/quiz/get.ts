import { NowRequest, NowResponse } from "@now/node";
import { QuizQuestion } from "./schema";

function shuffle(array: any[]) {
    var curr = array.length, temp, rand;
    while (curr) {
        rand = Math.floor(Math.random() * curr);
        --curr;
        temp = array[curr];
        array[curr] = array[rand];
        array[rand] = temp;
    }

    return array;
}

export default (req: NowRequest, res: NowResponse) => {
    const { id: titleId } = req.query;
    if (titleId) {
        QuizQuestion.scan().where("titleId").equals(titleId).exec((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            result = result.Items[0].attrs;
            for (const q of result.questions) {
                shuffle(q.answers);
            }
            shuffle(result.questions);
            return res.json(result);
        });
    } else {
        QuizQuestion.scan().loadAll().attributes(["titleId", "title", "description"]).exec((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            let array = new Array(result.Count);
            result.Items.forEach((v: any, i: number) => array[i] = v.attrs);
            return res.json(array);
        });
    }
}