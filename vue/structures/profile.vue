<style lang="sass" scoped>
    @import '../scss/imports';

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

    .reviews {
        p {
            margin-bottom: 0;
        }
    }

</style>

<template>
<div>
    <header class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <div class="max-wrapper">
                    <h1>{{details.name}}</h1>
                </div>
            </div>
        </div>
    </header>
    <main class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <div class="max-wrapper">
                    <p>Address: {{details.formatted_address}}</p>
                    <p>Number : {{details.formatted_phone_number}}</p>
                    <p><a :href="details.website">Go to Website</a></p>
                    <ul class="reviews">
                        <li v-for="review in details.reviews">
                            <p>Rating: {{review.rating}}</p>
                            <p>By: {{review.author_name}}</p>
                            <p>{{review.text}}</p>
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
                details: {
                    name: '',
                    formatted_address: '',
                    formatted_phone_number: '',
                    website: '',
                    reviews: []
                }
            };
        },
        components: {
            hotel
        },
        mounted() {
            request.post('/getdetails')
                .send({reference: this.$route.params.reference})
                .end((err, res) => {
                    res.body.reviews = res.body.reviews.slice(0, 5);
                    this.details = res.body;
                });
        },
        beforeCreate() {
            //usually would do request here to leverage ssr but having issues with superagent and webpack
        }
    };
</script>
