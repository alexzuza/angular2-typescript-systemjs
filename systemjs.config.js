/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  function mapIndex() {
    return {
      'app': 'app',
      '@angular': 'npm:@angular',
      'rxjs': 'npm:rxjs',
      'typescript': 'npm:typescript/lib/typescript.js' //add typescript map
    };
  }

  function mapUmd() {
    var map = {
      'app': 'app',
      'rxjs': 'npm:rxjs',
    };

    [ 'core',
      'common',
      'compiler',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router'
    ].forEach(function (name) {
      map['@angular/' + name] = 'npm:@angular/' + name + '/bundles/' + name + '.umd.js';
    });

    return map;
  }

  System.packageWithIndex = 1;

  var packages = {
    app: {
      main: './main.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
      main: './index.js',
      defaultExtension: 'js'
    }
  };

  if (System.packageWithIndex) {
    [ 'core',
      'common',
      'compiler',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router'
    ].forEach(function (name) {
      packages['@angular/' + name] = { main: 'index.js' };
    });
  }

  var config = {
    // paths serve as alias
    paths: {
      'npm:': 'node_modules/'
    },
    map: System.packageWithIndex ? mapIndex() : mapUmd(),
    // packages tells the System loader how to load when no filename and/or no extension
    packages: packages
  };

  if (System.packageWithIndex) {
    config['transpiler'] = 'typescript';
  }

  System.config(config);
})(this);