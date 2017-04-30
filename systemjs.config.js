/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    "defaultJSExtensions": true,
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'dist/app',
      // angular bundles
      '@angular/core': 'dist/angular/core/index',
      '@angular/common': 'dist/angular/common/index',
      '@angular/compiler': 'dist/angular/compiler/index',
      '@angular/platform-browser': 'dist/angular/platform-browser/index',
      '@angular/platform-browser-dynamic': 'dist/angular/platform-browser-dynamic/index',


      // other libraries
      'rxjs': 'npm:rxjs'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
