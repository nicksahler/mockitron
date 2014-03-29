var twitter = require('ntwitter');
var request = require('request');

// Problem with screen names is that they're re-settable, introducing a security problem. ~shrugs~
var access_list = [
  'nicksahler'
]

var user = 'nicksahler';

var twit = new twitter({
  consumer_key: 'xxx',
  consumer_secret: 'xxx',
  access_token_key: 'xxxxx',
  access_token_secret: 'xxxx'
});

twit.verifyCredentials(function (err, data) {
  if (err)
    console.log(err);
  console.log('Success!');
});

twit.stream('user', { track: 'nicksahler' }, function(stream) {
  stream.on('data', function (data) {
    var mention, state;

    if (data.id) {
      for (var i in data.entities.user_mentions)
        if (data.entities.user_mentions[i].screen_name === 'nicksahler')
          mention = true;

      for (var i in data.entities.hashtags)
        if (data.entities.hashtags[i].text === 'unlock' || data.entities.hashtags[i].text === 'lock')
          state = data.entities.hashtags[i].text;
      
      if (data.user && access_list.indexOf(data.user.screen_name) !== -1 && mention && state) {
        request.post('https://agent.electricimp.com/whatever');
      }
    }

  });

  stream.on('end', console.log);
  stream.on('destroy', console.log);

  //setTimeout(stream.destroy, 5000);
});