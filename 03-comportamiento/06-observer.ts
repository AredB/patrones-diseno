/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];

  constructor(private name: string) {}

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor del canal %c${this.name}`, COLORS.green);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(
      `%cUn suscriptor se ha dado de baja del canal ${this.name}`,
      COLORS.red,
    );
  }

  uploadVideo(videoTitle: string): void {
    console.log(
      `Canal ${this.name} ha subido un nuevo video %c${videoTitle}`,
      COLORS.green,
    );
    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  constructor(private name: string) {}

  notify(videoTitle: string): void {
    console.log(
      `%c${this.name} %cha sido notificado: %cNuevo video ${videoTitle}`,
      COLORS.blue,
      COLORS.white,
      COLORS.yellow
    );
  }
}

function main() {

  const channel = new YouTubeChannel('Cocinando con Fernando');
  const melissa = new Subscriber('Melissa');
  const cesar = new Subscriber('César');
  const waldo = new Subscriber('Waldo');

  channel.subscribe(melissa);
  channel.subscribe(cesar);

  channel.uploadVideo('Receta de Atún with tomato');
  
  channel.subscribe(waldo);
  
  channel.uploadVideo('Receta de Delicias de trigo con cacao');

  channel.unsubscribe(cesar);

  channel.uploadVideo('Receta de zumo de cebada y malta');

  channel.unsubscribe(waldo);

  channel.uploadVideo('Receta de pescao rebozao ');
  
  channel.unsubscribe(melissa);
  channel.uploadVideo('Receta de sardinas con nocilla');

  console.log(`\n\n`);
}

main();
