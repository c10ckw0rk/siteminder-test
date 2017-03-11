
<style lang="sass" scoped>

    @import '../scss/imports';

    a {
        display: block;
        overflow: hidden;
        min-height: 200px;
        background: #f2f2f2;
        max-width: baseline(100);
        margin: 0 auto;
    }

    .img {
        margin: 0 auto;
        width:200px;
        height:200px;

        @include breakpoint(sm) {
           float: left;
        }

        div {
            height: 100%;
            width: 100%;
            background-size: cover;
            background-position: center;
        }
    }

    .content {
        padding: baseline(2);

        @include breakpoint(sm) {
            float: left;
        }
    }

    p {
        margin-bottom: 0;
    }

</style>

<template>
<router-link class="hotel-wrapper" :to="`/profile/${listingData.place_id}`">
    <div class="img">
        <div v-if="listingData.photos" :style="`background-image: url('/getphoto?reference=${listingData.photos[0].photo_reference}');`"></div>
    </div>
    <div class="content">
        <h2 class="h3-size">{{listingData.name}}</h2>
        <p>Address: {{listingData.vicinity}}</p>
        <p v-if="listingData.rating">Rating: {{listingData.rating}}</p>
        <p v-if="!listingData.rating">Rating: no rating</p>
    </div>
</router-link>
</template>

<script>
    export default {
        name: 'hotel-listing',
        props: {
            listingData: {
                name: 'Dans Place',
                rating: 5.0,
                vicinity: 'Top of the world!',
                place_id: 'ChIJyYA_oAumEmsRaAGoDVDIluU',
                photos: [{photo_reference: 'CoQBdwAAADmbAg5lVyMy16nKRgEamUy4W59f1i9zTVMFxhBCCbU-4V1m5eyJKhrE-7_ZNIN6npn6O0e_pU7EA0Wn9K3BVE1GBqLWrkt5m0Cfb2y8zU3rzQ9UbbQJvNezGvna168fH2kA01PM7WpztH9jtpQTTGAMKhAO9Cov4cHlNUy96bLJEhApo3FwRzGh1ZdZyXarv0-tGhQTEYHQG6ehHqwje_6wV0k1vi4alw'}]
            }
        }
    };
</script>
