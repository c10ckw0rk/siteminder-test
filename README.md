# Code Challenge for Site Minder

### Features:

The User can find the their current position and display a list of the 5 closest hotels to them.
The list displays details of the hotel, including the name, an image and a rating metric.
Clicking on the name takes the user to a page with more details of that hotel, and a list of the latest 5 reviews.

### Pre-requirements

Install [Nodejs](http://nodejs.org)

### Install

Install local dependencies:

```
yarn
```

### Run

#####For Development

```
npm run dev
```

#####For Production

```
npm run start
```

### Testing

Using Karma and jasmine for tests, Have setup travis for intergration and unit tests.

```
npm run test
```

### Approach

Gone with a back and frontend solution here. Reason being I want to be able to serve as much as I can from the server for seo and speed on the client.

#### Stack

My main my choice in stack comes from ease, reliability, familiarity, performance and community support.

- Express
- Vue
- Vuex (Not included, would use in larger application)
- Webpack
- Sass

#### Structure
Concept and approach has been borowed from [vue-ssr-starter-kit](https://github.com/doabit/vue-ssr-starter-kit/tree/master/build); Structure is different but some files are refactored or direct copies.

```
├── .babelrc
├── .env
├── .gitignore
├── .scss-lint.yml
├── .travis.yml
├── index.js
├── package.json
├── Procfile
├── README.md
├── assets - any static assets images etc
├── build - webpack build configs (couple of alterations vue-ssr-starter-kit)
├── lib - classes that can be used in server or client or both
│   └── server
│       ├── dev-server.js (copy paste from of vue-ssr-starter-kit)
│       └── stream-render.js (refactoring of vue-ssr-starter-kit)
│
├── server - anything needed by the server for running the app typical would also include routes file different tempates etc...
│   ├── public - static assets to serve
│   ├── index.html - base template for ssr
│   └── server-bundle.js - vue server bundle
│ 
├── spec - unit/intergration tests
└── vue - view components & sass sorted by atomic design pattern
    ├── atoms
    ├── molecules
    ├── nuclides
    ├── scss - shared mixins and vars to be used by various vue components some borrow some stuff from bootstrap but the rest is custom I have been developing from project to project.
    └── structures

```

### Callouts

#### Security

Generally would like to put tighter security around my end points. Checking referer etc. I deliberately proxy my requests through the server so I can customise the security around requests.

#### Geocode

Would really like to have a google places autocomplete or something similar on the home screen as a fallback for geolocation, but just added a quick fallback to ryde nsw if not working.

#### Testing

With more time would configure unit tests for vue components using webpack. Have just written one test for details api but obviously would aim for more coverage in real code.

#### UX

Front end is really lacking here, usually would have a much nicer interface. I can provide examples of other UI's I have worked on. Wanted to just focus on the technical side of things.

