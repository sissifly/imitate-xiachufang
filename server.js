const http = require('http'),
	fs = require('fs'),
	nodePath = require("path"),
	nodeUrl = require('url'),
	program = require('commander'),
	mime = require('mime'),
	httpProxy = require('http-proxy');

let _path = ''; //用于保存当前页面的路径

/**
 * 创建代理服务器
 * @param  {[string]} proxyTarget 代理服务器IP地址
 * @return {[Object]}             代理服务器对象
 */
const getProxy = proxyTarget => {
	let proxy = httpProxy.createProxyServer({
		target: proxyTarget
	})
	proxy.on('error', (err, req, res) => {
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		console.log(err);
		res.end('something went wrong.')
	})
	return proxy;
}

//创建本地服务
const main = program => {
	const port = program.port,
		proxyTarget = program.target,
		proxy = proxyTarget && getProxy(program.target);
	console.log(program.target)
	http.createServer((req, res) => {
		const url = nodeUrl.parse(req.url),
			pathname = url.pathname,
			urlPath = nodePath.join(__dirname, 'src'),
			_pathname = nodePath.parse(pathname),
			ext = _pathname.ext;

		let filePath = urlPath + pathname;

		if (ext == '.html') {
			_path = _pathname.dir;
		}

		// 关闭nodejs 默认访问 favicon.ico
		if (!pathname.indexOf('/favicon.ico')) {
			return;
		}

		/**
		 * 接口处理：
		 *     如果访问的是后台开发机，则代理请求接口
		 *     否则中转请求到本地同名json文件
		 */
		if (!ext || ext == '.do') {
			var jumpInterFace = []; //设置跳过请求代理的接口
			jumpInterFace.push('psGetExsignInfo.do', 'checkValidOfMobile');
			if (proxyTarget && jumpInterFace.indexOf(_pathname.base) <= -1) { //代理请求接口
				proxy.web(req, res);
				return;
			}
			filePath = nodePath.resolve(__dirname + _path, 'data/', _pathname.name + '.json');
		}
		// console.log(filePath)
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHeader(404, {
					'content-type': 'text/html;charset="utf-8"'
				});
				res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
				res.end();
			} else {
				res.writeHeader(200, {
					'content-type': mime.getType(filePath)
				});
				res.write(data);
				res.end();
			}
		});
	}).listen(port);

	console.log('服务器开启成功,请通过localhost:' + port + '//访问！');
}

program
	.version("1.0.0")
	.option("-p, --port [port]", "设置运行端口", /^[0-9]{4,5}$/, 8870)
	.option("-t, --target [target]", "设置代理ip")
	.parse(process.argv);

main(program);
