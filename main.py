def on_a_pressed():
    global dart
    dart = sprites.create_projectile_from_sprite(img("""
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
        """),
        spacePlane,
        200,
        0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    global position
    if position == 0:
        spacePlane.say(word.slice(0, 3))
    elif position == 1:
        spacePlane.say(word.slice(3, 9))
    elif position == 2:
        spacePlane.say(word.slice(9, 14))
    elif position == 3:
        spacePlane.say(word.slice(14, 18))
    position += 1
    position %= 4 # position can only be 0, 1, 2, 3
    otherSprite.destroy(effects.fire, 500)
    info.change_score_by(1)
    pause(1000)
    spacePlane.say("")
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy()
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

bogey= None
dart= None

position = 0
word = "You can't stop me!"
word = word.to_lower_case()

spacePlane = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(spacePlane)
spacePlane.set_stay_in_screen(True)
info.set_life(3)

def on_update_interval():
    global bogey
    bogey = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    bogey.set_velocity(-100, 0)
    bogey.set_position(160, randint(5, 115))
    bogey.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(1000, on_update_interval)