import { Worker } from 'worker_threads';
import { resolveWorker } from '../../utils/index';

let pool: Map<string, () => void> = null;
let worker: Worker = null;

function createSceduleId(): string {
    return '' + pool.size + 1;
}

export function addSchedule(schedule: {
    begin: number;
    end: number;
    interval: number;
    task: () => void;
}) {
    const id = createSceduleId();
    pool.set(id, schedule.task);
    return id;
}

export function removeSchedule(id: string) {
    pool.delete(id);
    worker.postMessage({
        action: 'terminate',
        data: id
    });
}

export function start() {
    pool = new Map<string, () => void>();
    worker = new Worker(resolveWorker('TimerSchedule'));
    worker.on('message', id => {
        const task = pool.get(id);
        if (task) {
            task();
        }
    });
    console.log('TimerSchedule 工作线程已启动！');
}
