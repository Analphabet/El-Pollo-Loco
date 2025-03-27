class Endboss extends MoveableObject {
    height = 200;
    width = 200;
    y = 50;

    IMAGES_WALKING = [
        'img/enemies/enemies_boss/boss_walk/G1.png',
        'img/enemies/enemies_boss/boss_walk/G2.png',
        'img/enemies/enemies_boss/boss_walk/G3.png',
        'img/enemies/enemies_boss/boss_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/enemies/enemies_boss/boss_alert/G5.png',
        'img/enemies/enemies_boss/boss_alert/G6.png',
        'img/enemies/enemies_boss/boss_alert/G7.png',
        'img/enemies/enemies_boss/boss_alert/G8.png',
        'img/enemies/enemies_boss/boss_alert/G9.png',
        'img/enemies/enemies_boss/boss_alert/G10.png',
        'img/enemies/enemies_boss/boss_alert/G11.png',
        'img/enemies/enemies_boss/boss_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/enemies/enemies_boss/boss_hurt/G21.png',
        'img/enemies/enemies_boss/boss_hurt/G22.png',
        'img/enemies/enemies_boss/boss_hurt/G23.png',
		'img/enemies/enemies_boss/boss_hurt/G24.png'
    ];

    IMAGES_ATTACK = [
        'img/enemies/enemies_boss/boss_attack/G13.png',
        'img/enemies/enemies_boss/boss_attack/G14.png',
        'img/enemies/enemies_boss/boss_attack/G15.png',
        'img/enemies/enemies_boss/boss_attack/G16.png',
        'img/enemies/enemies_boss/boss_attack/G17.png',
        'img/enemies/enemies_boss/boss_attack/G18.png',
        'img/enemies/enemies_boss/boss_attack/G19.png',
        'img/enemies/enemies_boss/boss_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/enemies/enemies_boss/boss_dead/G24.png',
        'img/enemies/enemies_boss/boss_dead/G25.png',
        'img/enemies/enemies_boss/boss_dead/G26.png'
    ];


    constructor() {
        super().loadImage('img/enemies/enemies_boss/boss_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400;
	}
}