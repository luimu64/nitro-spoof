# goosemod plugin for sending all emojis without nitro

## Bug probably caused by goosemod
if the plugin stops working with console error saying that emojisize is null

1. uninstall the plugin
2. refresh the plugin store
3. reinstall the plugin

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
