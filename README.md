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

## How to use

### Week result
For viewing every week results put week number at the end of the url like: [Week number 1](http://127.0.0.1:4000/1).
you can view weeks without running previous week. it gives you the results based on the data that already have and it may change when you run weeks one after another.

### Single team matches

For viewing single team matches make request to: [http://127.0.0.1:4000/matches/TEAM_ID](http://127.0.0.1:4000/matches/1)

### Reset app

For resetting all the data and start a fresh one make a GET request to [http://127.0.0.1:4000/reset/all](http://127.0.0.1:4000/reset/all)

### Docker use

For using this app with docker run the following:

```bash
docker-compose up --build
```

##Swagger

For viewing swagger documentation go to [http://127.0.0.1:4000/docs](http://127.0.0.1:4000/docs)

## Testing

For testing app, create a database named `football_test`, go to preject folder and run:

```bash
adonis test
```

This test will check every week results to see if every team took place in a match only once a week