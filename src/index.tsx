import { render } from 'solid-js/web';
import { App } from './app';

const appContainer = document.querySelector('#app');

if (appContainer) {
  const dispose = render(() => <App />, appContainer);

  /**
   * Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
   * Learn more: https://www.snowpack.dev/#hot-module-replacement
   *
   * Note: Solid doesn't support state preservation on hot reload as of yet
   */
  if (import.meta.env.MODE === 'development') {
    import.meta.hot.accept();
    import.meta.hot.dispose(dispose);
  }
}
