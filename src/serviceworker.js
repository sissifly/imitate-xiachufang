// 定义需要缓存的文件
var cacheFiles = [
  'home.html',
  './js/home.js',
  './js/libs/zepto.min.js',
  './css/base.css',
  './css/reset.css',
  './css/home.css'
];

// 监听 service worker 的 install 事件
this.addEventListener('install', function (event) {
  // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
  event.waitUntil(
    // caches是一个 CacheStorage 对象，使用open()方法打开一个缓存，缓存通过名称进行区分。
    caches.open('xiachufang-caches').then(function (cache) {
      // 通过 cache 缓存对象的 addAll() 方法缓存文件。
      return cache.addAll(cacheFiles);
    })
  );
});
// 缓存操作
this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // 如何有缓存的话，那么就直接返回缓存，否则直接获取源文件
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
