<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Radio Web TOGOLA - Mobile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #111;
            color: #fff;
            text-align: center;
            padding: 30px 10px;
        }
        h1 {
            color: #f4d03f;
            font-size: 1.8em;
            margin-bottom: 20px;
        }
        #playlist {
            list-style: none;
            padding: 0;
            max-width: 400px;
            margin: 20px auto;
        }
        #playlist li {
            padding: 15px;
            margin-bottom: 5px;
            border-radius: 8px;
            cursor: pointer;
            background-color: #222;
            font-size: 1em;
        }
        #playlist li.active {
            background-color: #f4d03f;
            color: #111;
            font-weight: bold;
        }
        #currentTrack {
            font-size: 1.2em;
            margin-top: 15px;
        }
        audio {
            width: 100%;
            max-width: 400px;
            margin-top: 20px;
        }
        input[type="file"] {
            margin-top: 20px;
            color: #fff;
        }
        button {
            font-size: 1em;
            padding: 12px 20px;
            margin: 10px 5px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            background-color: #f4d03f;
            color: #111;
        }
    </style>
</head>
<body>

    <h1>Radio Web TOGOLA</h1>

    <input type="file" id="musicUploader" multiple accept="audio/*">
    <ul id="playlist"></ul>
    <div id="currentTrack">Aucune musique en cours</div>

    <audio id="player" controls autoplay></audio>

    <script>
        const musicUploader = document.getElementById('musicUploader');
        const playlist = document.getElementById('playlist');
        const player = document.getElementById('player');
        const currentTrack = document.getElementById('currentTrack');

        let tracks = [];
        let currentIndex = 0;
        let shuffle = true;

        // Charger les fichiers
        musicUploader.addEventListener('change', (event) => {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                const url = URL.createObjectURL(file);
                tracks.push({ name: file.name, url });
            });
            renderPlaylist();
            if(tracks.length > 0) playTrack(currentIndex);
        });

        function renderPlaylist() {
            playlist.innerHTML = '';
            tracks.forEach((track, index) => {
                const li = document.createElement('li');
                li.textContent = track.name;
                li.dataset.index = index;
                li.addEventListener('click', () => {
                    currentIndex = index;
                    playTrack(currentIndex);
                });
                playlist.appendChild(li);
            });
            highlightTrack();
        }

        function playTrack(index) {
            if(tracks.length === 0) return;
            player.src = tracks[index].url;
            player.play();
            currentTrack.textContent = "En direct : " + tracks[index].name;
            highlightTrack();
        }

        function highlightTrack() {
            const items = playlist.querySelectorAll('li');
            items.forEach(item => item.classList.remove('active'));
            if(tracks[currentIndex]) items[currentIndex].classList.add('active');
        }

        player.addEventListener('ended', () => {
            if(shuffle) {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * tracks.length);
                } while(nextIndex === currentIndex && tracks.length > 1);
                currentIndex = nextIndex;
            } else {
                currentIndex = (currentIndex + 1) % tracks.length;
            }
            playTrack(currentIndex);
        });
    </script>

</body>
</html>