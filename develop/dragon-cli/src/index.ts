import DragonCli from '@dragon-cli/core';
import Dev from '@dragon-cli/dev';
const cli = new DragonCli('');

cli.registerModule(Dev);

export default cli;
