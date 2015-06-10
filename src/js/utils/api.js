import request from 'superagent';

export class ZetkinPlatform {
    constructor() {
        this._config = {
            host: 'api.zetk.in',
            port: 80
        }
    }

    configure(config) {
        var key;
        for (key in config) {
            this._config[key] = config[key];
        }
    }

    req(method, path, headers, body, cb) {
        var url = 'http://' + this._config.host + ':' + this._config.port + path;

        var req = request[method.toLowerCase()](url)

        if (body) {
            req.set('Content-Type', 'application/json')
            req.send(body)
        }

        if (headers) {
            var header;

            for (header in headers) {
                req.set(header, headers[header]);
            }
        }

        req.end(function(err, res) {
            // TODO: Error handling
            cb(JSON.parse(res.text));
        });
    }
}

var zetkin = new ZetkinPlatform()

export default zetkin;
