import { DragonCli } from '@dragon-cli/core';
import Dev from '@dragon-cli/dev';

const cli = new DragonCli();

cli.registerModule(new Dev());

export default cli;
