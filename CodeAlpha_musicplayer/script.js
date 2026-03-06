let songs = [
{
title: "Song 1",
artist: "Artist 1",
src: "song1.mp3"
},

{
title: "Song 2",
artist: "Artist 2",
src: "song2.mp3"
},

{
title: "Song 3",
artist: "Artist 3",
src: "song3.mp3"
}
]

let audio = document.getElementById("audio")
let title = document.getElementById("title")
let artist = document.getElementById("artist")
let progress = document.getElementById("progress")
let volume = document.getElementById("volume")

let songIndex = 0
let playing = false

function loadSong(){
audio.src = songs[songIndex].src
title.innerText = songs[songIndex].title
artist.innerText = songs[songIndex].artist
}

loadSong()

function playPause(){

if(playing){
audio.pause()
playing = false
}
else{
audio.play()
playing = true
}

}

function nextSong(){

songIndex++

if(songIndex >= songs.length){
songIndex = 0
}

loadSong()
audio.play()

}

function prevSong(){

songIndex--

if(songIndex < 0){
songIndex = songs.length - 1
}

loadSong()
audio.play()

}

audio.addEventListener("timeupdate", function(){

progress.value = (audio.currentTime / audio.duration) * 100

})

progress.addEventListener("input", function(){

audio.currentTime = (progress.value / 100) * audio.duration

})

volume.addEventListener("input", function(){

audio.volume = volume.value

})