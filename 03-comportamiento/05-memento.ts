/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

class GameMemento {
  constructor(
    private level: number,
    private health: number,
    private position: string,
  ) {}

  getLevel(): number {
    return this.level;
  }

  getHealth(): number {
    return this.health;
  }

  getPosition(): string {
    return this.position;
  }
}

class Game {
  constructor(
    private level: number = 1,
    private health: number = 100,
    private position: string = "Inicio",
  ) {
    console.log(
      `Jugando en el nivel ${level}
    Ssalud: ${this.health}
    Posición: ${this.position}
    `,
    );
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(
      `Jugando en el nivel ${this.level}
      Salud: ${this.health}
      Posición: ${this.position}
      `,
    );
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `\n%cCargando partida
      
      %cPartida cargada en el nivel %c${this.level}
      Salud: ${this.health}
      Posición: ${this.position}`,
      COLORS.yellow,
      COLORS.blue,
      COLORS.white,
    );
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento) {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game();
  const history = new GameHistory();

  history.push(game.save());

  // Jugador avanza en el juego
  game.play(2, 90, "Bosque Encantado");
  history.push(game.save());
  
  game.play(3, 70, "Cueva Oscura");
  history.push(game.save());
  
  game.play(5, 50, "Castillo del Dragón");
  console.log(`%c\nEstado actual`, COLORS.green);

  game.restore(history.pop()!);
  console.log(`%c\nÚltima partida cargada`, COLORS.green);
  
  console.log(`\n\n`);
  
}

main();
