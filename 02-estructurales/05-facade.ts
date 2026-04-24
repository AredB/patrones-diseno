/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Projector {
  turnOn() {
    console.log("Proyector encendido");
  }

  turnOff() {
    console.log("Proyector apagado");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }

  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPlayer {
  on() {
    console.log("Reproductor de video encendido");
  }

  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, COLORS.blue);
  }

  stop() {
    console.log("Película detenida");
  }

  off() {
    console.log("Reproductor de video apagado");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Haciendo palomitas");
  }
  turnOffPoppingPopcorn() {
    console.log("Apagado");
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private popcornMaker: PopcornMaker;
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;

  constructor({
    popcornMaker,
    projector,
    soundSystem,
    videoPlayer,
  }: HomeTheaterFacadeOptions) {
    this.popcornMaker = popcornMaker;
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
  }

  watchMovie(movie: string): void {
    console.log(`%cPreparando para ver la película`, COLORS.purple);
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log(`%cDisfruta de la película`, COLORS.green);
  }

  endWatchingMovie(): void {
    console.log(`\n\n%cPreparando para detener la película`, COLORS.orange);
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPoppingPopcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log(`%cSistema apagado`, COLORS.red);
  }
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const popcornMaker = new PopcornMaker();
  const videoPlayer = new VideoPlayer();

  const homeTheater = new HomeTheaterFacade({
    projector,
    soundSystem,
    popcornMaker,
    videoPlayer,
  });

  homeTheater.watchMovie(`El Señor de los Anillos: El retorno del Rey`);
  homeTheater.endWatchingMovie();
}

main();
