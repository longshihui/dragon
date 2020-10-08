import { parentPort } from 'worker_threads';

let pool = new Map<
    string,
    {
        begin: number;
        end: number;
        interval: number;
    }
>();

const inRange = (now: number, begin: number, end: number) => {
    return begin <= now && now <= end;
};

const needFire = (now: number, begin: number, interval: number) => {
    return (now - begin) % interval === 0;
};

const onTerminate = id => {
    pool.delete(id);
};

parentPort.on('message', ({ action, data }) => {
    switch (action) {
        case 'terminate':
            onTerminate(data);
            break;
    }
});

setInterval(() => {
    const now = Date.now();
    for (let [id, config] of pool) {
        if (!inRange(now, config.begin, config.end)) {
            continue;
        }
        if (needFire(now, config.begin, config.interval)) {
            parentPort.postMessage(id);
        }
    }
}, 1000);
