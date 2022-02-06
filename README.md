# vue2-micro-frontend-application-template

## Overview

This repository explains the minimum setup to build single-spa host application with Vue 2. It uses libraries below

- Vue 2
- single-spa
- single-spa-vue
- systemjs-webpack-interop
- SystemJS
- Webpack

### Shared libraries

The parcel is intended to share vendor libraries with other parcels. The host application is responsible to manage all the libraries that are used by parcels and this host application. This project uses SystemJS to manage all the libraries.

`vue.config.js` has an `externals` configuration with `libraryTarget: 'system'`, which loads external libraries through SystemJS's import-map. The import-map also manages the locations of parcels.

### Registering a new micro-frontend

#### First step: Add the application as `externals`

Micro-frontend application must be served as SystemJS library via external JavaScript. Add your application name to `externals` in `vue.config.js` to let Webpack know it's an external library. With this way, when the host `app.js` is loaded, `System.register` is automatically called to fetch the external libraries using import-maps.

#### Second step: Create a new component with `Parcel`

`single-spa-vue` provides a `Parcel` component to mount single-spa parcels easily. Mainly, you need to add the application name in `parcelConfig` like this:

```
parcelConfig: import('vue2-micro-frontend-parcel-template')
```

#### Third step: Configure import-maps

Run `npm run serve` command to start the host application, however, it will fail since there is no import-maps for this new application. Open the application on a browser, and click `{...}` to edit import-maps. Click `Add new module` and enter the module name(micro front-end application name) and the development URL.

The development url will be the URL from parcel application with `npm run serve:integration`. 

### Local development

This project itself doesn't have anything since this is a host application to manage other parcels. To load other parcels and make them work, you have to set all the import-maps with the development URL.

To get the parcel's url, see the document of `vue2-micro-frontend-parcel-template`

Also, this host project has to have all the library urls in import-maps. You'll have to update override URLs with:

- `vue`: https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js
- `single-spa-vue`: https://cdn.jsdelivr.net/npm/single-spa-vue@2.5.1/dist/umd/single-spa-vue.min.js
- `single-spa`: https://cdn.jsdelivr.net/npm/single-spa/lib/system/single-spa.dev.js
