var request = require('request');

module.exports = function(pattern, host){
    return function(req, res, next){
        if(req.url.match(pattern)){
            var db_path = req.url.match(pattern)[1],
                db_url = [host, db_path].join('/'),
                req_method = req.method.toLowerCase();
            if (req_method == 'delete') {
                req_method = 'del';
            }
            req.pipe(request[req_method](db_url)).pipe(res);
        } else {
            next();
        }
    }
}
