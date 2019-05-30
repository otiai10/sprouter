# Sprouter

<img src="https://user-images.githubusercontent.com/931554/58608018-ab4ee080-82dc-11e9-95a1-dd50cd11eef5.png" width="50%">

A desktop application, converting audio files to MP3 formatted, detect BPM, and prepend the BPM to the file name.

```sh
your-music-file.wav

-> convert to ->

124_your-music-file.mp3
```

to make it a bit easier to prepare / play DJing on [CDJ-400](https://www.pioneerdj.com/product/player/archive/cdj-400/black/overview/).

# Support

- [x] macOS
- [ ] Linux
- [ ] Windows

# Prerequisites

- `ffmpeg`
  - https://ffmpeg.org/
- `sox`
  - http://sox.sourceforge.net/
- `bpm-tools`
  - http://www.pogo.org.uk/~mark/bpm-tools/

```zsh
brew install ffmpeg sox bpm-tools
```

# Development

Then, start the app.

```
npm install
npm start
```
