// single-spa-config.js
import { registerApplication, start } from 'single-spa';

// Simple usage
registerApplication({
  name: 'vue2-micro-frontend-parcel-template',
  app: () => import('vue2-micro-frontend-parcel-template'),
  activeWhen: (location) => location.pathname.startsWith('/')
});

start();
