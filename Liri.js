var keys = require('./keys.js')
var Twitter = require('twitter');
var spotify = require('spotify');
var getMyTweets = function() {

    var client = new Twitter(keys.twitterKeys);
    
    var params = {screen_name: '@mistuosman'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // console.log(tweets);
        for(var i=0;i<tweets.length; i++) {
            console.log(tweets[i].creat_at);
            console.log(' ');
            console.log(tweets[i].text);
        }
    }
    });

}

var getArtistNames = function(artist) {
	return artist.name;
}

var getMeSpotify = function(songName) {
	
	spotify.search({ type: 'track', query: songName}, function(err, data) {
		if ( err ) {
			console.log('Error occurred: ' + err);
			return;
		}
	 
		var songs = data.tracks.items;
		for(var i=0; i<songs.length; i++) {
			console.log(i);
			console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
			console.log('song name: ' + songs[i],name);
			console.log('preview song: ' +songs[i].preview_url);
			console.log('album: ' + songs[i].album.name);
			console.log('------------------------------------------');

		}
	});
  }
var getMeMovie = function(movieName) {

	var request = require('request');
	request('http://www.omdbapi.com/?t=pulp+fiction' + movieName + '&y=&plot=short&r=json', function (error, response, body) {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	console.log('body:', body); // Print the HTML for the Google homepage.

	var movie = JSON.parse(body);

	//Prints out movie info
	logOutput("Movie Title: " + movie.Title);
	logOutput("Release Year: " + movie.Year);
	logOutput("IMDB Rating: " + movie.imdbRating);
	logOutput("Country Produced In: " + movie.Country);
	logOutput("Language: " + movie.Language);
	logOutput("Plot: " + movie.Plot);
	logOutput("Actors: " + movie.Actors);
});
	
}
var doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function (err, data) {
		if (err) throw err;
		console.log(data);

		var dataArr = data.split('.');

		if (dataArr.length ==2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length ==1) {
		pick(dataArr[0]);
		}
	  });
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
                getMyTweets();
				break;
			case 'spotify-this-song':
				getMeSpotify();
				break;
			case 'movie-this':
				getMeMovie(functionData);
			case 'do-what-it-says':
				break;
            default:
            console.log('Liri does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.arg[2], process[3]);
