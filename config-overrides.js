const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const darkTheme = require('antd/dist/dark-theme');
const compactTheme = require('antd/dist/compact-theme');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // '@primary-color': '#1DA57A',
      // 'hack': `true;@import "${ require.resolve('antd/lib/style/color/colorPalette.less') }";`,
      // ...darkTheme,
      // ...compactTheme,
    },
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
