#!/usr/bin/env node
const svgrPlugin = require("esbuild-plugin-svgr");
const esbuild = require("esbuild");

esbuild.build({
    logLevel: "info",
    entryPoints: ["./src/App.tsx"],
    bundle: true,
    outfile: "es-www/out.js",
    plugins: [
        svgrPlugin(),
    ],
    loader: {
        '.png': 'file',
        '.svg': 'file',
    },
    external: ['*.svg']  // Temp hack to get around url() in css not building
  })
  .catch(() => process.exit(1));
