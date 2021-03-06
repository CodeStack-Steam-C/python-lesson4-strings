controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    dart = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 4 4 . . . . . . . 
                    . . . . . . 4 5 5 4 . . . . . . 
                    . . . . . . 2 5 5 2 . . . . . . 
                    . . . . . . . 2 2 . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    
    if (position == 0) {
        spacePlane.say(word.slice(0, 3))
    } else if (position == 1) {
        spacePlane.say(word.slice(3, 9))
    } else if (position == 2) {
        spacePlane.say(word.slice(9, 14))
    } else if (position == 3) {
        spacePlane.say(word.slice(14, 18))
    }
    
    position += 1
    position %= 4
    //  position can only be 0, 1, 2, 3
    otherSprite.destroy(effects.fire, 500)
    info.changeScoreBy(1)
    pause(1000)
    spacePlane.say("")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let bogey = null
let dart = null
let position = 0
let word = "You can't stop me!"
word = word.toLowerCase()
let spacePlane = sprites.create(img`
        ..ccc.........ffffff....
            ..f4cc.......fcc22ff....
            ..f44cc...fffccccff.....
            ..f244cccc22224442cc....
            ..f224cc2222222244b9c...
            ..cf2222222222222b999c..
            .c22c222222222b11199b2c.
            f22ccccccc222299111b222c
            fffffcc222c222222222222f
            .....f2222442222222222f.
            ....f222244fc2222222ff..
            ...c222244ffffffffff....
            ...c2222cfffc2f.........
            ...ffffffff2ccf.........
            .......ffff2cf..........
            ........fffff...........
    `, SpriteKind.Player)
controller.moveSprite(spacePlane)
spacePlane.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function on_update_interval() {
    
    bogey = sprites.create(img`
            ...........fffffff...ccfff..........
                    ..........fbbbbbbbffcbbbbf..........
                    ..........fbb111bbbbbffbf...........
                    ..........fb11111ffbbbbff...........
                    ..........f1cccc1ffbbbbbcff.........
                    ..........ffc1c1c1bbcbcbcccf........
                    ...........fcc3331bbbcbcbcccf..ccccc
                    ............c333c1bbbcbcbccccfcddbbc
                    ............c333c1bbbbbbbcccccddbcc.
                    ............c333c11bbbbbccccccbbcc..
                    ...........cc331c11bbbbccccccfbccf..
                    ...........cc13c11cbbbcccccbbcfccf..
                    ...........c111111cbbbfdddddc.fbbcf.
                    ............cc1111fbdbbfdddc...fbbf.
                    ..............cccfffbdbbfcc.....fbbf
                    ....................fffff........fff
        `, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.setPosition(160, randint(5, 115))
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
