/**
 * @type {import('snowpack').SnowpackConfig}
 */
 const config = {
  mount: {
    public: '/',
    src: '/dist',
  },
  packageOptions: {
    installTypes: true,
    NODE_ENV: true,
  },
  devOptions: {
    out: 'dist',
    open: 'none',
    bundle: true,
  },
  buildOptions: {
    clean: true,
    out: 'dist',
  },
  plugins: [
    "@vanilla-extract/snowpack-plugin",
    '@snowpack/plugin-babel',
    '@snowpack/plugin-typescript',
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2020',
    treeshake: true,
    splitting: true,
  },
};

module.exports = config;
