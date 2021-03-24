import defaults from "superagent-defaults";

export default function request() {
    const superagent = defaults();

    const defaultRequest = superagent
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")

    return defaultRequest;
}