<template>
  <Parcel
    v-on:parcelMounted="parcelMounted()"
    v-on:parcelUpdated="parcelUpdated()"
    :config="parcelConfig"
    :mountParcel="mountParcel"
    :wrapWith="wrapWith"
    :wrapClass="wrapClass"
    :wrapStyle="wrapStyle"
    :parcelProps="getParcelProps()"
  />
</template>

<script>
// For old versions of webpack
import Parcel from 'single-spa-vue/dist/esm/parcel'

import { mountRootParcel } from 'single-spa'

export default {
  components: {
    Parcel
  },
  data() {
    return {
      /*
        parcelConfig (object, required)

        The parcelConfig is an object, or a promise that resolves with a parcel config object.
        The object can originate from within the current project, or from a different
        microfrontend via cross microfrontend imports. It can represent a Vue component,
        or a React / Angular component.
        https://single-spa.js.org/docs/recommended-setup#cross-microfrontend-imports

        Vanilla js object:
        parcelConfig: {
          async mount(props) {},
          async unmount(props) {}
        }

        // React component
        parcelConfig: singleSpaReact({...})

        // cross microfrontend import is shown below
      */
      parcelConfig: import('vue2-micro-frontend-parcel-template').then(ns => {
        return ns
      }),


      /*
        mountParcel (function, required)

        The mountParcel function can be either the current Vue application's mountParcel prop or
        the globally available mountRootParcel function. More info at
        http://localhost:3000/docs/parcels-api#mountparcel
      */
      mountParcel: mountRootParcel,

      /*
        wrapWith (string, optional)

        The wrapWith string determines what kind of dom element will be provided to the parcel.
        Defaults to 'div'
      */
      wrapWith: 'div',

      /*
        wrapClass (string, optional)

        The wrapClass string is applied to as the CSS class for the dom element that is provided to the parcel
      */
      wrapClass: 'bg-red',

      /*
        wrapStyle (object, optional)

        The wrapStyle object is applied to the dom element container for the parcel as CSS styles
      */
      wrapStyle: {
        outline: '1px solid red'
      },
    }
  },
  methods: {
    // These are the props passed into the parcel
    getParcelProps() {
      return {
        text: `Hello world`
      }
    },
    // Parcels mount asynchronously, so this will be called once the parcel finishes mounting
    parcelMounted() {
      console.log("parcel mounted");
    },
    parcelUpdated() {
      console.log("parcel updated");
    }
  }
}
</script>
