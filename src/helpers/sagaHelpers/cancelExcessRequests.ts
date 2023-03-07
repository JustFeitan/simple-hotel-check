import { Task } from "redux-saga";
import { cancel, fork, take } from "redux-saga/effects";

export function* cancelExcessRequests(type: string, worker: any) {
    let task: Task | null = null;
    let abortController = new AbortController();
    while (true) {
        yield take(type);
        if (task) {
            abortController.abort();
            yield cancel(task);
            abortController = new AbortController();
        }
        task = yield fork(worker, abortController.signal);
    }
}
