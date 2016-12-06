const ffmpeg = require('fluent-ffmpeg');
const mime = require('mime');
const fs = require('fs');
const dir = process.argv[2];
const chalk = require('chalk');

fs.readdir(dir, (err, files) => {
    if (err) {
        process.exit(1);
    }
    // clone file list to avoid increasing loop size
    files = JSON.parse(JSON.stringify(files));
    files.forEach((file) => {
        if (mime.lookup(file).indexOf('audio') > -1 && !/.flac$/.test(file)) {
            try {
                ffmpeg()
                    .input(file)
                    .audioCodec('flac')
                    .save(`${file}.flac`)
                    .on('start', () => {
                        console.log(chalk.grey(`starting ${file}...`));
                    })
                    .on('end', () => {
                        console.log(chalk.green(`${file}.flac done`));
                    });
            } catch (e) {
                console.log(e);
            }
        }
    });
});