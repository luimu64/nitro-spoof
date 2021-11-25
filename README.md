# goosemod plugin for sending all emojis without nitro

## How to use:
1. go to plugins 
2. cloud icon in top right corner 
3. paste this into the url bar: <br>
`https://raw.githubusercontent.com/luimu64/nitro-spoof/gm-master/dist/modules.json`

4. search and add the plugin like any other from the store

I didn't bother setting the up the repo properly so there is no pgp

## Escaping emojis

If you want to prevent the plugin from replacing specific emoji (to use NQN for example),
you can prepend the emoji with '\\' character. If you wish to also prevent NQN picking up the emoji use two of them. 

## Cons:
- if emoji is put in message with text the link will be visible
- size scales resolution instead of the actual size resulting in pixelated images if size is set too small

## To do:

- [x] settings for changing emoji size
- [ ] sending emojis as separate message if message has text
- [ ] stickers (if even possible)
- [ ] reactions (if even possible)

## Variants
### Goosemod 
The main variant which I maintain currently since I use gm actively. Can be found in gm-master branch.
### Powercord
First variant of the plugin which I am not maintaining anymore.
### Cumcord
Cumcord variant ported by Yellowsink in [here](https://github.com/yellowsink/cc-plugins). 
This is the recommended way for using for all platforms except Goosemod. If there is an issue with this variant
don't make issue here since I have no say in what Yellowsink does, instead make issue in the repo linked above.
