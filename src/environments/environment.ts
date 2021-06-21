// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://gateway.marvel.com/v1/public',
  api_key: '05625341a4b9b4e948b1e3efb1ef0ed6',
  firebaseConfig: {
    apiKey: "AIzaSyCmPOivXyk8S2hbiNyaiY_aVOERYE78JYg",
    authDomain: "uberflug-hereos-app.firebaseapp.com",
    projectId: "uberflug-hereos-app",
    storageBucket: "uberflug-hereos-app.appspot.com",
    messagingSenderId: "521703366319",
    appId: "1:521703366319:web:e4596a22dbbfa573073e5a",
    measurementId: "G-HW460FMYSX"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
