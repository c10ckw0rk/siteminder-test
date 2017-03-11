import {app, router} from './app';

export default context => {
    router.push(context.url);
    return Promise.all(router.getMatchedComponents()).then(() => {
        return app;
    });
};
