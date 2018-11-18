const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('./index.html', { open: true, logLevel: 3, sourceMaps: true, minify: false });
bundler.on('buildStart', (entryPoints) => {
	console.log(entryPoints);
});
const app = express();

app.use(bundler.middleware());

const port = process.env.PORT || 1234;
console.warn(' http://localhost:' + port);
app.listen(Number(port));
