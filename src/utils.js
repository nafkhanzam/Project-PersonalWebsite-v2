import showdown from "showdown";
import axios from "axios";

export async function getNIMData() {
    return JSON.stringify((await getJSON("/assets/nim_data.json")).data);
}

export async function getJSON(path) {
    const res = await axios(path);
    if (isHtml(res)) return null;
    return res.data;
}

export function toPrettyDate(data) {
    if (!data) data = new Date(0, 0, 0);
    return new Intl.DateTimeFormat("en-AU").format(
        typeof data === "string" ? new Date(data) : data,
    );
}

export function isHtml(res) {
    return (
        res &&
        res.headers &&
        res.headers["content-type"] &&
        res.headers["content-type"].includes("html")
    );
}

export function isJson(res) {
    return (
        res &&
        res.headers &&
        res.headers["content-type"] &&
        res.headers["content-type"].includes("application/json")
    );
}

export async function getBlog(name) {
    try {
        const res = await axios(`/assets/blogs/${name}.md`);
        const data = await axios(`/assets/blogs/${name}.json`);
        if (isHtml(res) || !isJson(data)) {
            return null;
        }
        return [data.data, new showdown.Converter().makeHtml(res.data)];
    } catch (_) {
        return null;
    }
}

export async function getQuiz(id) {
    const res = await axios.get("/api/quiz", {
        params: { id },
    });
    if (!isJson(res)) {
        return null;
    }
    return res.data;
}

export async function getQuizzes() {
    const res = await axios.get("/api/quiz");
    if (!isJson(res)) {
        return null;
    }
    return res.data;
}

export async function postQuizAnswer(answerObject) {
    const res = await axios.post("/api/quiz", answerObject);
    if (!isJson(res)) {
        return null;
    }
    return res.data;
}
