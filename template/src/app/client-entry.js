import {app} from '.';

app.$mount('#app');

// When Webpack builds css, this code will ensure that new styles will be shown in the browser.
if (module.hot) {
  const reporter = window.__webpack_hot_middleware_reporter__;
  const success = reporter.success;
  reporter.success = function () {
    document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
      const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
      link.href = nextStyleHref;
    });
    success();
  };
}
