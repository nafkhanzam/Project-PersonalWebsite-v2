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

export async function getBlog(name) {
    try {
        const res = await axios(`/assets/blogs/${name}.md`);
        const data = await axios(`/assets/blogs/${name}.json`);
        if (isHtml(res) || isHtml(data)) {
            return null;
        }
        return [data.data, new showdown.Converter().makeHtml(res.data)];
    } catch (_) {
        return null;
    }
}
