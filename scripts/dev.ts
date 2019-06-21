import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import RendererDevDllWebpackConfig from "../build/webpack.config.renderer.dev.dll";
import RendererDevWebpackConfig from "../build/webpack.config.renderer.dev";
import portFinder from "portfinder";
import path from "path";
import CheckNodeEnv from "../build/utils/CheckNodeEnv";

CheckNodeEnv("development");

const DEFAULT_PORT = 1212;
const DEFAULT_HOST = "localhost";
const DLL_OUTPUT_PATH = path.join(__dirname, "..", "dll");

async function buildDll() {
  await new Promise((resolve, reject) => {
    webpack(
      RendererDevDllWebpackConfig({
        outputPath: DLL_OUTPUT_PATH
      }),
      (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
}

async function runServer() {
  const port = Number(process.env.PORT) || DEFAULT_PORT;
  const host = process.env.HOST || DEFAULT_HOST;
  const webpackConfig = RendererDevWebpackConfig({
    host,
    port,
    dllManifestPath: path.resolve(DLL_OUTPUT_PATH, "renderer.json")
  });
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, webpackConfig.devServer);
  const handleProcessClose = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on("SIGINT", handleProcessClose);
  process.on("SIGTERM", handleProcessClose);
  server.listen(port, host);
  console.log("监听: " + host + port);
}

async function main() {
  await buildDll();
  await runServer();
}

main();
