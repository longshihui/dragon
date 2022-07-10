/**
 * Dragon主进程
 */
import { BootstrapQueue } from '@dragon-app/core';

/**
 * 内部服务
 */
import RenderStarter from './inner-services/render-starter';
import Debug from './inner-services/debug';
import Devtools from './inner-services/devtools';
import Icon from './inner-services/icon';
import Lifecycle from './inner-services/lifecycle';
import Menu from './inner-services/menu';
import SourceMap from './inner-services/source-map';

/**
 * app模块
 */
import HelloWorld from '@dragon-app/module-hello-world/service';

const queue = new BootstrapQueue();

queue.append(Debug);
queue.append(Devtools);
queue.append(Icon);
queue.append(Lifecycle);
queue.append(Menu);
queue.append(SourceMap);
queue.append(RenderStarter);

queue.append(HelloWorld);

queue.run();
