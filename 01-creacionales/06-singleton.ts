/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if ( !DragonBalls.instance ) {
            DragonBalls.instance = new DragonBalls();
            console.log('%c¡Las bolas de dragón han sido creadas!', COLORS.green)
        }

        return DragonBalls.instance;
    }

    collectBall(): void {
        if (this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log(
                `Bola de dragón encontrada. Total de bolas: ${ this.ballsCollected }`
            );
            return;
        }

        console.log(
            'Ya se han encontrado las 7 bolas de dragón! Invoca a Shenlong!'
        );
    }

    summonShenLong(): void {
        if ( this.ballsCollected === 7 ) {
            console.log('Shenlong ha sido invocado, ¡pide tu deseo!');
            this.ballsCollected = 0;
            return;
        }

        console.log(`\nAún faltan ${ 7 - this.ballsCollected } bolas de dragón para invocar a Shenlong.`);
        

    }
}

function main() {
    const gokuDragonBalls = DragonBalls.getInstance();

    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();

    gokuDragonBalls.summonShenLong();

    const vegetaDragonBalls = DragonBalls.getInstance();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();

    gokuDragonBalls.summonShenLong();

    vegetaDragonBalls.summonShenLong();
}

main();
