let songsArr = [
    {
        id:1,
        songName:'Kamikaze',
        artistName:'Eminem',
        image:'https://media.gettyimages.com/id/1262334567/photo/hollywood-ca-eminem-a-k-a-marshall-bruce-mathers-iii-attends-a-ceremony-honoring-curtis-50.jpg?s=612x612&w=gi&k=20&c=mzuoXUwnDY6wneK-xjA7am4MpTtgIdv5I29E4Nh0JU0=',
        genre:'HipHop',
        songURL : 'media/195_09-Kamikaze.mp3'
    },
    {
        id:2,
        songName:'Without Me!',
        artistName:'Eminem',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDj4batnhDeAACZarfa9UqObcWVXAsbxBH3g2hWGaY4bT87IaO3ScU-HaHC5AuToAwP0&usqp=CAU',
        genre:'HipHop',
        songURL : 'media/eminem-s-song_eminem-without-me.mp3'
    },
    {
    id: 3,
    songName: 'Shape of You',
    artistName: 'Ed Sheeran',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7rUdCOmGH8Imgm02hZ0qGz42bjL63oEGTzg&s',
    genre: 'HipHop',
    songURL : 'media/Shape-Of-You-Instrumental.mp3'
  },
  {
    id: 4,
    songName: 'Blinding Lights',
    artistName: 'The Weeknd',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW1H9XyzkHtw29yzNBBG9PD4d63vvcWn4gJg&s',
    genre: 'Pop',
  },
  {
    id: 5,
    songName: 'Smells Like Teen Spirit',
    artistName: 'Nirvana',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW1H9XyzkHtw29yzNBBG9PD4d63vvcWn4gJg&s',
    genre: 'Rock',
  },
  {
    id: 6,
    songName: 'Bohemian Rhapsody',
    artistName: 'Queen',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf0sGimuieTq2ekTJaxYoW1bP3q5srK_8djg&s',
    genre: 'Rock',
  },
  {
    id: 7,
    songName: 'Take Five',
    artistName: 'Dave Brubeck',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLCS8CJGli4LD-w2DALxggGIB3n6Gyq2EMeg&s',
    genre: 'Jazz',
  },
  {
    id: 8,
    songName: 'What a Wonderful World',
    artistName: 'Eminem',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjhnJYSI_PQEYC7He8PG1q6Mr6o47oWGKC2g&s',
    genre: 'Jazz',
  },

]

//accessing HTML Elements..
let songdiv = document.getElementById('allsong');
let filter  = document.getElementById('genreFilter');
let cardImage = document.querySelector('.card-img');
let artistName = document.querySelector('.artist-name');
let songName = document.querySelector('.song-name');
let nextButton = document.querySelector('.next-btn');
let prevButton = document.querySelector('.prev-btn');
let playButton = document.querySelector('.play-btn');
let audio = document.querySelector('.audio');
let playlistname = document.querySelector('#playlist-search')
let createPlaylistbtn = document.querySelector('.createPlaylist');
let playlistcont = document.querySelector('#playlist-cont');
let currentplayList = document.querySelector('.playlist-card');
let addToPlayList = document.querySelector('.addto');


//filtersongs
function filterSongsByGenre(){
    const selectedGenre = filter.value;
    let filteredsongs =[];
    if(selectedGenre === 'all'){
        filteredsongs = songsArr;
    }
    else{
        filteredsongs = songsArr.filter(song =>song.genre.toLocaleLowerCase() ===selectedGenre.toLowerCase());
    }
     showSongs(filteredsongs);
}

let currentsongIndex = 0;
const playlists =[];

let activePlaylistName = null;

//function to show Songs
function showSongs(filteredsongs){

      songdiv.innerHTML = "<h3>All songs</h3>";

      filteredsongs.forEach(playlist =>{
      const songshow = document.createElement('p');
      songshow.classList.add('song-item');

songshow.textContent = playlist.songName;


        songshow.addEventListener('click', () => {
            renderCurrentSong(playlist);
        });

        nextButton.addEventListener('click',()=>{
               currentsongIndex++;
               
               if (currentsongIndex >= songsArr.length) {
        currentsongIndex = 0;
    }
    renderCurrentSong(songsArr[currentsongIndex]);
        })
        
        prevButton.addEventListener('click', () => {
    currentsongIndex--;
    if (currentsongIndex < 0) {
        currentsongIndex = songsArr.length - 1;
    }
    renderCurrentSong(songsArr[currentsongIndex]);
});


        songdiv.appendChild(songshow);
      });   
}

filter.addEventListener('change', filterSongsByGenre);
showSongs(songsArr);

function renderCurrentSong(playlist){
      cardImage.src = playlist.image;
      artistName.textContent = playlist.artistName;
      songName.textContent = playlist.songName;
       audio.src = playlist.songURL;  // Set audio source here
    audio.load();                  
    audio.play();   
       showSongs(filteredsongs);
}

function playSong(playlist){
  audio.src =  playlist.songURL;
  audio.play();
}

function createPlayList(){
        const playList = document.createElement('p');
        playList.textContent = playlistname.value;
        if (!playList.textContent) return;   
        playList.classList.add('song-item');
        playlistcont.appendChild(playList);

        playlistname.value = '';

         playList.addEventListener('click', () => {
        activePlaylistName = playList;
        if (!playlists[activePlaylistName]) {
            playlists[activePlaylistName] = [];
        }
    });
}

createPlaylistbtn.addEventListener('click',()=>{
        createPlayList();
})



addToPlayList.addEventListener('click',()=>{
   renderCurrentSong(); 
})

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

