const isProd = process.env.NODE_ENV === 'production';
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const lruCache = require('lru-cache');
const serialize = require('serialize-javascript');
const fs = require('fs');
const compression = require('compression');
const devServer = require('./dev-server');
const path = require('path');

class StreamRender {

    constructor(app) {
        this.app = app;
        this.renderer = undefined;

        const createRenderer = (bundle) => {
            return createBundleRenderer(bundle, {
                cache: lruCache({
                    max: 1000,
                    maxAge: 1000 * 60 * 15
                })
            });
        };

        if (isProd) {
            // create server renderer from real fs
            const bundlePath = path.resolve(__dirname, '../../server/server-bundle.js');
            app.use(compression());
            this.renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));
        } else {
            devServer(app, bundle => {
                this.renderer = createRenderer(bundle);
            });
        }

    }

    static html(getStyle) {
        const template = fs.readFileSync(path.resolve(__dirname, '../../server/index.html'), 'utf-8');
        const i = template.indexOf('{{ APP }}');

        // styles are injected dynamically via vue-style-loader in development
        //
        const style = getStyle ? '<link rel="stylesheet" href="/public/styles.css">' : '';
        const head = template.slice(0, i).replace('{{ STYLE }}', style);
        const tail = template.slice(i + '{{ APP }}'.length);

        return {
            head: head,
            tail: tail
        };
    }

    route(req, res) {

        res.set({
            'Content-Type': 'text/html; charset=utf-8',
        });

        if (!this.renderer) {
            res.end('waiting for compilation... refresh in a moment.');
        }

        const s = Date.now();
        const context = {url: req.url};
        const renderStream = this.renderer.renderToStream(context);
        let firstChunk = true;
        res.write(this.constructor.html(isProd).head);

        renderStream.on('data', chunk => {

            if (firstChunk) {
                // embed initial store state

                if (context.initialState) {

                    res.write(`<script>window.__INITIAL_STATE__=${
                        serialize(context.initialState, {isJSON: true})
                    }</script>`);

                }

                firstChunk = false;
            }

            res.write(chunk.toString('utf8'));

        });

        renderStream.on('end', () => {
            res.end(this.constructor.html().tail);
            console.log(`whole request: ${Date.now() - s}ms`);
        });

        renderStream.on('error', err => {
            throw err;
        });

    }

}

module.exports = StreamRender;
