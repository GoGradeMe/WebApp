// Generated by LiveScript 1.3.1
(function(){
  var request, Promise, EventEmitter, auth, promisifyReq, httpGet, httpPost, httpPut, httpDel, url, statusByName, statusByNumber, res$, key, value, baseApi, types, cacheSet, responseToCaches, mergeInto, i$, toString$ = {}.toString;
  request = require('superagent');
  Promise = require('bluebird');
  EventEmitter = require('eventemitter3');
  auth = {
    token: (function(){
      switch (false) {
      case !localStorage.token:
        return localStorage.token;
      default:
        return null;
      }
    }())
  };
  promisifyReq = function(req){
    return new Promise(function(resolve, reject){
      return req.set('Accept', 'application/json').set('Content-Type', 'application/json').set('Authorization', auth.token ? "Bearer " + auth.token : null).end(function(error, res){
        switch (false) {
        case !(error || (res != null ? res.status : void 8) >= 400):
          return reject(res) || error;
        default:
          return resolve(res.body);
        }
      });
    });
  };
  httpGet = function(url, opts){
    return promisifyReq(request.get(url).query(opts));
  };
  httpPost = curry$(function(url, data){
    return promisifyReq(request.post(url).send(data));
  });
  httpPut = curry$(function(url, data){
    return promisifyReq(request.put(url).send(data));
  });
  httpDel = function(url){
    return promisifyReq(request.del(url));
  };
  url = function(type, id){
    var parts;
    parts = [module.exports.baseUrl || "/api", type, id].filter(function(it){
      return it && it.length;
    });
    return parts.join('/');
  };
  statusByName = {
    ok: 200,
    created: 201,
    notAuthorized: 401,
    notFound: 404,
    conflict: 409,
    badRequest: 400
  };
  res$ = {};
  for (key in statusByName) {
    value = statusByName[key];
    res$[value] = key;
  }
  statusByNumber = res$;
  baseApi = {
    get: function(id){
      var that, this$ = this;
      switch (false) {
      case !(that = this.cache[id]):
        return Promise.resolve(that);
      default:
        return baseApi.doGet.call(this, this.type, id).then(function(){
          return this$.cache[id];
        });
      }
    },
    find: function(opts){
      opts == null && (opts = {});
      return baseApi.doGet.call(this, this.type, void 8, opts);
    },
    update: function(id, data){
      var this$ = this;
      return baseApi.doPut.call(this, this.type, id, data).then(function(){
        return this$.cache[id];
      });
    },
    create: function(data){
      switch (false) {
      case !(this.findSimilar && this.findSimilar(data)):
        return Promise.reject({
          status: status.conflict,
          message: "This " + this.type + " already exists"
        });
      default:
        return baseApi.doPost.call(this, this.type, data);
      }
    },
    del: function(id){
      return baseApi.doDel.call(this, this.type, id);
    },
    doGet: function(type, id, opts){
      return httpGet(url(this.type, id), opts).then(responseToCaches);
    },
    doPost: function(type, data){
      var this$ = this;
      return httpPost(url(type), data)['catch'](function(it){
        var status, ref$, data, ref1$;
        status = it.status || ((ref$ = it.body) != null ? ref$.status : void 8);
        data = {
          statusCode: status,
          status: statusByNumber[status],
          message: ((ref1$ = it.body) != null ? ref1$.message : void 8) || statusByName[status]
        };
        throw mergeInto(data, it);
      }).then(responseToCaches).then(function(it){
        return this$.get(it[0].id);
      });
    },
    doPut: function(type, id, data){
      var this$ = this;
      return httpPut(url(this.type, id), data)['catch'](function(it){
        var status, ref$, data, ref1$;
        status = it.status || it.statusCode || ((ref$ = it.body) != null ? ref$.status : void 8);
        data = {
          statusCode: status,
          status: statusByNumber[status],
          message: ((ref1$ = it.body) != null ? ref1$.message : void 8) || statusByName[status]
        };
        throw mergeInto(data, it);
      }).then(responseToCaches).then(function(){
        return this$.get(data.id);
      });
    },
    doDel: function(type, id){
      return httpDel(url(type, id));
    }
  };
  types = {
    person: {},
    'class': {},
    enrollment: {},
    term: {},
    schoolYear: {},
    type: {},
    assignment: {},
    grade: {},
    school: {},
    user: {}
  };
  cacheSet = function(cache, data){
    switch (false) {
    case !cache[data.id]:
      return mergeInto(data, cache[data.id]);
    case !data.id:
      return cache[data.id] = data;
    default:
      throw new Error('cannot set item without id .' + JSON.stringify(data));
    }
  };
  responseToCaches = function(data){
    var type, items, i$, len$, item;
    for (type in data) {
      items = data[type];
      for (i$ = 0, len$ = items.length; i$ < len$; ++i$) {
        item = items[i$];
        cacheSet(types[type].cache, item);
      }
    }
    return items;
  };
  mergeInto = function(source, target){
    var key, value;
    for (key in source) {
      value = source[key];
      target[key] = (fn$());
    }
    return target;
    function fn$(){
      switch (toString$.call(value).slice(8, -1)) {
      case 'Array':
        return (target[key] || []).concat(value);
      case 'String':
        return value;
      case 'Number':
        return value;
      case 'Null':
        return value;
      case 'Object':
        return mergeInto(value, target[key] || {});
      default:
        return value;
      }
    }
  };
  for (i$ in types) {
    (fn$.call(this, i$, types[i$]));
  }
  types.session = {
    cache: [],
    get: function(){
      switch (false) {
      case !localStorage.token:
        return localStorage.token;
      default:
        return null;
      }
    },
    del: function(){
      var ref$;
      return ref$ = localStorage.token, delete localStorage.token, ref$;
    },
    create: function(arg$){
      var email, password;
      email = arg$.email, password = arg$.password;
      return new Promise(function(resolve, reject){
        return request.post(url('session')).send({
          email: email,
          password: password
        }).set('Accept', 'application/json').set('Content-Type', 'application/json').end(function(error, resp){
          var statusCode, message, ref$;
          if (error || resp === null || (resp != null ? resp.status : void 8) >= 400) {
            statusCode = (resp != null ? resp.satus : void 8) || 400;
            message = (resp != null ? (ref$ = resp.body) != null ? ref$.message : void 8 : void 8) || statusByNumber[statusCode];
            return reject({
              statusCode: statusCode,
              message: message
            });
          } else {
            auth.token = resp != null ? resp.body.session[0].token : void 8;
            types.session.cache[0] = resp != null ? resp.body.session[0] : void 8;
            return resolve(resp);
          }
        });
      });
    }
  };
  types.auth = auth;
  module.exports = types;
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
  function fn$(key, thing){
    thing.events = new EventEmitter();
    thing.cache = {};
    thing.type = key;
    thing.get = function(id){
      return baseApi.get.call(this, id);
    };
    thing.find = function(opts){
      return baseApi.find.call(this, opts);
    };
    thing.create = function(data){
      var this$ = this;
      return baseApi.create.call(this, data).then(function(it){
        this$.events.emit("change", this$.cache);
        return it;
      });
    };
    thing.update = function(id, data){
      var this$ = this;
      return baseApi.update.call(this, id, data).then(function(){
        return this$.events.emit("change", this$.cache);
      });
    };
    thing.del = function(id){
      var this$ = this;
      return baseApi.del.call(this, id).then(function(){
        delete this$.cache[id];
        return this$.events.emit("change", this$.cache);
      })['return'](true);
    };
  }
}).call(this);
