# Football prediction API

For using this app run the following

```bash
npm install -g @adoniscli/js
npm install
adonis install pg
adonis key:generate
adonis migration:run
adonis seed
adonis serve --dev
```

Now go to [Server](http://127.0.0.1:4000)

### How to use

For viewing every week results put week number at the end of the url like: [Week number 1](http://127.0.0.1:4000/1).
you can view weeks without running previous week. it gives you the results based on the data that already have and it may change when you run weeks one after another.

### Testing

For testing app, create a database named `football_test`, go to preject folder and run:

```bash
adonis test
```

This test will check every week results to see if every team took place in a match only once a week