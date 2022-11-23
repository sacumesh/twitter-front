// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  contractAddress: '0x7D5A5e9d52983B210251681B85fe5B045236c27B',
  // // contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  // contractAddress: '0x831f6fa31500F6134e62327Cc2BBD7Fe44f4EB4c',
  web3WebsocketProviderHost:
    'wss://ropsten.infura.io/ws/v3/c408acc6d32941a496920461a9c1335f',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
