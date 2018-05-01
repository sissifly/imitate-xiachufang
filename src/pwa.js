if ('serviceWorker' in navigator) {
  // 注册 service Worker
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('serviceworker.js', {scope: './'})
      .then(function (registration) {
        // 注册成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function (err) {
        // 注册失败
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
