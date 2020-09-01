import { Worker } from 'worker_threads';

const pool = new Map<string, () => void>();
const worker: Worker = new Worker('./TimeSchedule.worker.ts');

worker.on('message', id => {
    const task = pool.get(id);
    if (task) {
        task();
    }
});

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
