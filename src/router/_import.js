module.exports = file => resolve => {
  import('@/views/' + file).then(module => {
    resolve(module)
  })
}

// es5的写法
// module.exports = function (file) {
//   return function (resolve) {
//     import('@views/' + file).then(function (module) {
//       resolve(module)
//     })
//   }
// }
