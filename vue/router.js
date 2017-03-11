import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './structures/home.vue';
import profile from './structures/profile.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        component: home
    }, {
        path: '/profile/:reference',
        component: profile
    }]
});

export default router;
