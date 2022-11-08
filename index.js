const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

const file = process.argv[2];
const count = process.argv[3];

for (let i = 0; i <= count; i++) {
    ffmpeg().input(path.join(__dirname, file))
        .input(path.join(__dirname, 'assets/1pxLayer.png'))
        .videoCodec('libx264')
        .complexFilter([
            `[0:v]scale=640:-1[bg];[bg][1:v]overlay=W-w/${randomFloat(0, 3)}:H-h/${randomFloat(0, 3)}`
        ])
        .outputFPS(Math.round(randomFloat(55,60)))
        .outputOptions('-metadata', `title="movie${i}"`)
        .output(path.join(__dirname, `assets/output/movie${i}.mp4`))
        .run();
}



