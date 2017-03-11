<template>
  <div id="app">
     <router-view class="view"></router-view>
  </div>
</template>

<script>
    export default {
        name: 'router-view-template'
    };
</script>

<style lang="sass">
    ///*
    //* Bootstrap v3.3.7 (http://getbootstrap.com)
    //* Copyright 2011-2015 Twitter, Inc.
    //* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    ///*

    // Core variables and mixins
    @import '../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/variables';
    @import '../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins';

    // Core CSS
    @import '../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/grid';

    // Utility classes
    @import '../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/utilities';
    @import '../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/responsive-utilities';

    @import './scss/reset';
    @import './scss/typography';

    //fix for responsive bootstrap
    .col-xs-1,
    .col-sm-1,
    .col-md-1,
    .col-lg-1,
    .col-xs-2,
    .col-sm-2,
    .col-md-2,
    .col-lg-2,
    .col-xs-3,
    .col-sm-3,
    .col-md-3,
    .col-lg-3,
    .col-xs-4,
    .col-sm-4,
    .col-md-4,
    .col-lg-4,
    .col-xs-5,
    .col-sm-5,
    .col-md-5,
    .col-lg-5,
    .col-xs-6,
    .col-sm-6,
    .col-md-6,
    .col-lg-6,
    .col-xs-7,
    .col-sm-7,
    .col-md-7,
    .col-lg-7,
    .col-xs-8,
    .col-sm-8,
    .col-md-8,
    .col-lg-8,
    .col-xs-9,
    .col-sm-9,
    .col-md-9,
    .col-lg-9,
    .col-xs-10,
    .col-sm-10,
    .col-md-10,
    .col-lg-10,
    .col-xs-11,
    .col-sm-11,
    .col-md-11,
    .col-lg-11,
    .col-xs-12,
    .col-sm-12,
    .col-md-12,
    .col-lg-12 {
        box-sizing: border-box;
        padding-right: baseline(2);
        padding-left: baseline(2);
    }

    .row {
        margin-right: - baseline(2);
        margin-left: - baseline(2);
    }

    body {
        font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
        font-size: 14px;
        line-height: 1.42857;
        color: #333;
        background-color: #fff;
    }

    .max-wrapper {
        margin: 0 auto;
        max-width: 1200px;
    }

</style>
