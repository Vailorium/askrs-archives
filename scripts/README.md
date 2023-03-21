# Askrs Archives prebuild Scripts

Prebuild scripts that are run before building the client and server containers.

## Prerequisites

Make sure to add a game_files folder to this directory, this folder should be a JSON dump of the game files. The easiest way to do this is to simply grab the game data from [this repository](https://github.com/HertzDevil/feh-assets-json) and copy the files directly into the game_files folder.

This directory should look like this:

- scripts
  - data_extract
    - ...
  - ...
  - game_files
    - extras
    - files
