// module.exports = {
//   devServer: {
//     proxy: {
//       "^/api": {
//         target: "http://localhost:8888",
//         changeOrigin: true,
//       },
//     },
//   },
// };


module.exports = {
  // options...
  devServer: {
    proxy: "http://localhost:8888/api/v1",
  },
};
