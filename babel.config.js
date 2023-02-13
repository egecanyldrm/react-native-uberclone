module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel",'react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
/* 
 [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
        },
      },
    ],


*/
