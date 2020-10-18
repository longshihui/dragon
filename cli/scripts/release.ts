import changelog from 'conventional-changelog';
import { levelLog, paint } from '../utils/Logger';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import inquirer from 'inquirer';
import detectIndent from 'detect-indent';
import { exec } from 'child_process';
import { promisify } from 'util';

const CHANGE_LOG_OUTPUT = path.join(process.cwd(), 'CHANGELOG.md');
const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');
const promisifyExec = promisify(exec);
const isFirstRelease = !fs.existsSync(CHANGE_LOG_OUTPUT);

async function bumpVersion() {
    const oldPackageJSON = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
    const oldVersion = JSON.parse(oldPackageJSON).version;
    const indent = detectIndent(oldPackageJSON).indent;
    const newPackageJSON = JSON.parse(oldPackageJSON);
    let newVersion = '';

    if (isFirstRelease) {
        newVersion = oldVersion;
        levelLog('warning', `本次为第一次发布版本, 版本号为${newVersion}`);
    } else {
        const answer = await inquirer.prompt<{
            type: 'major' | 'minor' | 'patch';
        }>([
            {
                name: 'type',
                type: 'list',
                message: '选择下一个发布版本的版本类型',
                choices: [
                    {
                        name: '重大版本升级',
                        value: 'major'
                    },
                    {
                        name: '特性变更',
                        value: 'minor'
                    },
                    {
                        name: '补丁',
                        value: 'patch'
                    }
                ]
            }
        ]);
        newVersion = semver.inc(oldVersion, answer.type);
    }

    newPackageJSON.version = newVersion;

    fs.writeFileSync(
        PACKAGE_JSON_PATH,
        JSON.stringify(newPackageJSON, null, indent)
    );

    return { oldVersion, newVersion };
}

async function genGitTag(version: string) {
    await promisifyExec(`git tag v${version}`);
}

async function createCommit(version: string) {
    await promisifyExec(`git add .`);
    await promisifyExec(`git commit -m "发布版本: ${version}"`);
}

async function genChangeLog() {
    const ws = fs.createWriteStream(CHANGE_LOG_OUTPUT);
    changelog({
        preset: 'angular',
        releaseCount: 0
    }).pipe(ws);
    return new Promise((resolve, reject) => {
        ws.on('close', resolve);
        ws.on('error', reject);
    });
}

async function syncToRemote() {
    levelLog('info', '同步版本信息至远程中...');
    await promisifyExec(`git push --tags`);
    levelLog('info', '同步远程完成!');
}

function finalySay(oldVersion: string, newVersion: string) {
    if (isFirstRelease) {
        levelLog('info', `成功发布第一个版本${paint('success', newVersion)}`);
        return;
    }
    levelLog(
        'info',
        `成功更新版本号：${paint('warning', newVersion)} -> ${paint(
            'success',
            oldVersion
        )}`
    );
}

(async function () {
    try {
        levelLog('info', '进入版本发布流程\n');
        const { oldVersion, newVersion } = await bumpVersion();
        await genChangeLog();
        await createCommit(newVersion);
        await genGitTag(newVersion);
        await syncToRemote();
        finalySay(oldVersion, newVersion);
    } catch (e) {
        levelLog('error', e.message);
        process.exit(1);
    }
})();
