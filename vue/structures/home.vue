<style lang="sass" scoped>
    @import '../scss/imports';

    .col-xs-12 {
        @include breakpoint(xs) {
            width:auto;
        }
    }

    li {
        list-style:none;
        margin-bottom: baseline(2);
    }

    ul {
        margin: 0;
        padding: 0;
    }

    h1 {
        text-align: center;
        padding: baseline(6);
        margin: 0;
        color: white;
    }

    header {
        background: $ebony-clay;
        margin-bottom: baseline(3);
        border-bottom: 3px solid $burnt-sienna;
    }

</style>

<template>
<div>
    <header class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <div class="max-wrapper">
                    <h1>Hotel Listings</h1>
                </div>
            </div>
        </div>
    </header>
    <main class="container-fluid">
        <div>
            <div class="col-xs-12 hotel-list">
                <div class="max-wrapper">
                    <ul>
                        <li v-for="hotel in list">
                            <hotel :listing-data="hotel"></hotel>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</div>

</template>

<script>

    import request from 'superagent';
    import hotel from '../atoms/hotel.vue';

    export default {
        name: 'home',
        data() {
            return {
                list: []
            };
        },
        components: {
            hotel
        },
        mounted() {

            navigator.geolocation.getCurrentPosition(position => {
                request.post('/gethotels')
                .send({geocode: `${position.coords.latitude},${position.coords.longitude}`})
                .end((err, res) => {
                    this.list = res.body;
                });
            }, err => { // fallback if failure
                console.error(err);
                request.post('/gethotels')
                .send({geocode: '-33.815278,151.101111'})
                .end((err, res) => {
                    this.list = res.body;
                });
            });
        }
    };
</script>
