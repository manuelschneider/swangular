'use strict';

var Swangular = function () {
  var endpoints = {};

  this.endpoint = function (name, config) {
    endpoints[name] = config;
  };

  this.addAuth = function (key, value, type ) {
    window.authorizations.add(key, new window.ApiKeyAuthorization(key, value, type));
  };

  function SwaggerWrapper () {
    var onloadCbs = [];
    var loadedEndpoints = {};

    for (var i in endpoints) {
      loadedEndpoints[i] = false;
    }

    var allLoaded = function (item) {
      if (item) {
        loadedEndpoints[item] = true;
      }
      var yep = true;
      for (var j in loadedEndpoints) {
        if (!loadedEndpoints[j]) {
          yep = false;
          break;
        }
      }
      if (yep) {
        for (i=0; i<onloadCbs.length; i++) {
          if (typeof(onloadCbs[i]) === 'function') {
            // required because the success cb seems to be called in the wrong place
            setTimeout(onloadCbs[i], 500);
            delete onloadCbs[i];
          }
        }
      }
    };

    this.ready = function (cb) {
      onloadCbs.push(cb);
      allLoaded();
    };


    for (var item in endpoints) {
      endpoints[item].success = allLoaded.bind(this, item);
      this[item] = new window.SwaggerApi(endpoints[item]);
    }
  }

  var wrapper = null;

  this.$get = function () {
    if (wrapper === null) {
      wrapper = new SwaggerWrapper();
    }
    return wrapper;
  };

};


angular.module('swangular', []).
  provider('Swangular', Swangular);