Swangular
==========

An angularjs provider to use swagger ressources.

## Usage

0. Load the files from lib/ in your index.html before the app.js:

        <script src="contrib/shred.bundle.js"></script>
        <script src="contrib/swagger.js"></script>
        <script src="contrib/swangular.js"></script>


1. Require the module in your app

        var app = angular.module('superapp', [ 'swangular' ]);


2. Configure your ressources

        app.config(function (SwangularProvider) {
          SwangularProvider.endpoint('superService', { 
            'url': 'https://localhost:8081/swagger-docs'
            // you may use any config opt for swagger except 'success' here..
          });

          // optional
          SwangularProvider.addAuth('api_key', 'p0wn', 'header');
        }

    I haven't figured out how to provide per-instance auths right now, so be careful when
    handling multiple swagger ressources with auths.


3. Use it in your controller

    Call `/xxx/:id` (swagger-nickname 'get'):

        app.controller('MainCtrl', function (Swangular) {
          Swangular.ready(function () {
            console.log('xx', Swangular.superService.apis.xxx.get({id: '123'}, function ( data ) {
              console.log('res', data.obj);
            }));
          });
        });

    If you need your swagger-ressource not directly at load-time, you don't have wrap your
    call in `.ready`.


## License

MPL.