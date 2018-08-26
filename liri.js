
require("dotenv").config();
var keys = require("./keys.js"); //importing access keys for tumblr and spotify


var command = process.argv[2];
var song = process.argv; 
var song_movie = "";
var sep = "";

for(var i = 3; i < song.length; i++){
	song_movie += sep + song[i];

	sep = " ";
}

switch(command){ 
	case "my-posts":
		tumblr();
		break;
	case "spotify-this-song":
		spotify();
		break;
	case "omdb":
		movie();
		break;
	case "do-what-it-says":
		reset();
		break;
}

function tumblr(){
var Tumblr = require('tumblr');// access the npm tumblr package
  

var client = new Tumblr(keys.tumblr); // storing the imported keys in object client
 
var params = {screen_name: 'chocho', count:21}; 
client.get('statuses/user_timeline', params, function(error, posts, response) {
  if (!error) {
  	for(i = 1; i < params.count; i++){ //looping through the count parameter to print out the 20 most recent tweets
    console.log(i + "." + " " + posts[i].text); 
    console.log("created at" + " " + posts[i].created_at);
    console.log("");
    
    }
  }
});

}

function spotify(){ 
var Spotify = require('node-spotify-api'); //calling the node spotify npm package

var spotify = new Spotify(keys.spotify);

if(song_movie){
spotify.search({type: 'track', query: song_movie, limit:1}, function(err, data){
	if(err){
		return console.log('Error occured: ' + err);
	}
	console.log("artist: " + " " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2)); //prints the artist name
	console.log("song: " + " " + JSON.stringify(data.tracks.items[0].name, null, 2)); //prints the song name
	console.log("album: " + " " + JSON.stringify(data.tracks.items[0].album.name, null, 2)); //prints the album name
	console.log("preview: " + " " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)); //prints a preview link the to song

	});
   }else{
spotify.search({type: 'track', query: 'The Sign', limit:5}, function(err, data){
	if(err){
		return console.log('Error occured: ' + err);
	}
	console.log("artist: " + " " + JSON.stringify(data.tracks.items[4].album.artists[0].name, null, 2)); //Ace of Bass
	console.log("song: " + " " + JSON.stringify(data.tracks.items[4].name, null, 2)); //'The Sign'
	console.log("album: " + " " + JSON.stringify(data.tracks.items[4].album.name, null, 2)); //'The Sign'
	console.log("preview: " + " " + JSON.stringify(data.tracks.items[4].preview_url, null, 2)); //prints a preview link the to song
	});
   }
}

function movie(){
	var request = require('request');
	if(song_movie){
	request('http://www.omdbapi.com/?t='+song_movie+'&y=&plot=short&tomatoes=true&apikey=trilogy', function (error, response, body) {
    if(error){
    	return console.log(error);;
    }
    if(!error && response.statusCode == 200){
    // console.log('statusCode:', response && response.statusCode); 
    console.log('Title:', JSON.parse(body).Title); 
    console.log('Year Released:', JSON.parse(body).Year); 
    console.log('IMDB Rating:', JSON.parse(body).imdbRating); 
    console.log('Country:', JSON.parse(body).Country); 
    console.log('Language(s):', JSON.parse(body).Language);
   	console.log('Plot:', JSON.parse(body).Plot);
   	console.log('Starring:', JSON.parse(body).Actors);
   	console.log('Rotten Tomatoes:', JSON.parse(body).tomatoURL);
   		}
	});
	}else{
		song_movie = "Mr.Nobody";
		request('http://www.omdbapi.com/?t='+song_movie+'&y=&plot=short&tomatoes=true&apikey=trilogy', function (error, response, body) {
    if(error){
    	return console.log(error);;
    }
    if(!error && response.statusCode == 200){
   
    console.log('Title:', JSON.parse(body).Title); 
    console.log('Year Released:', JSON.parse(body).Year); 
    console.log('IMDB Rating:', JSON.parse(body).imdbRating); 
    console.log('Country:', JSON.parse(body).Country); 
    console.log('Language(s):', JSON.parse(body).Language);
   	console.log('Plot:', JSON.parse(body).Plot);
   	console.log('Starring:', JSON.parse(body).Actors);
   	console.log('Rotten Tomatoes:', JSON.parse(body).tomatoURL);
   		}
	});
	}
}

function reset(){ // reset function using fs to re-assign the command and song variables
	var fs = require('fs');
	fs.readFile("random.txt", "utf8", function(err, content){
		if(err){
			return console.log(err);
		}
	    // console.log(content);
	    var contentArr = content.split(",");
	 	command = contentArr[0]; //"spotify-this-song"
		song = contentArr[1]; //"I Want It That Way" from random.txt stored in song

        switch(command){ 
        	case contentArr[0]: //"spotify-this-song"
        		spotify();
        		break;
        }
        function spotify(){ 
          var Spotify = require('node-spotify-api'); //calling the node spotify npm package

      
          var spotify = new Spotify(keys.spotify);

          if(song){
          spotify.search({type: 'track', query: 'hello', limit:1}, function(err, data){
	           if(err){
		          return console.log('Error occured: ' + err);
	             }
	           console.log("artist: " + " " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2)); //prints the artist name
	           console.log("song: " + " " + JSON.stringify(data.tracks.items[0].name, null, 2)); //prints the song name
	           console.log("album: " + " " + JSON.stringify(data.tracks.items[0].album.name, null, 2)); //prints the album name
	           console.log("preview: " + " " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)); //p

        });

    }
   }
 });
}
spotifySong();