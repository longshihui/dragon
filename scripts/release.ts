import changelog from 'conventional-changelog';
import { levelLog, paint } from '../build/utils/Logger';
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

async function bumpVersion() {
    const oldPackageJSON = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
    const oldVersion = JSON.parse(oldPackageJSON).version;
    const indent = detectIndent(oldPackageJSON).indent;
    const newPackageJSON = JSON.parse(oldPackageJSON);
    let newVersion = '';
    const answer = await inquirer.prompt<{ type: 'major' | 'minor' | 'patch' }>(
        [
            {
                name: 'type',
                type: 'list',
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
        ]
    );
    newVersion = semver.inc(oldVersion, answer.type);
    newPackageJSON.version = newVersion;
    fs.writeFileSync(
        PACKAGE_JSON_PATH,
        JSON.stringify(oldPackageJSON, null, indent)
    );
    return newVersion;
}

async function genGitTag(version: string) {
    await promisifyExec(`git tag v${version}`);
}

async function createCommit(version) {
    await promisifyExec(`git add .`);
    await promisifyExec(`git commit -m "发布版本: ${version}"`);
}

async function genChangeLog() {
    const ws = fs.createWriteStream(CHANGE_LOG_OUTPUT);
    changelog({
        preset: 'angular'
    }).pipe(ws);
    return new Promise((resolve, reject) => {
        ws.on('close', resolve);
        ws.on('error', reject);
    });
}

(async function () {
    try {
        const version = await bumpVersion();
        genGitTag(version);
        await genChangeLog();
        await createCommit(version);
        levelLog('info', `更新版本号至${paint('success', version)}`);
    } catch (e) {
        levelLog('error', e.message);
        process.exit(1);
    }
})();
