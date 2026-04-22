/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log("Ataca con %cuna espada", COLORS.blue);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log("Ataca con %cun hacha", COLORS.red);
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log("Lanza un hechizo %cmágico poderoso", COLORS.green);
  }
}

class FireBallSpell implements Ability {
  use(): void {
    console.log("Lanza una %cbola de fuego", COLORS.orange);
  }
}

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract useAbility(): void;
}

class Warrior extends Character {
  override useAbility(): void {
    console.log("El guerrero está listo para luchar");
    this.ability.use();
  }
}

class Mage extends Character {
  override useAbility(): void {
    console.log("El mago está listo para lanzar un hechizo");
    this.ability.use();
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack());
  warrior.useAbility();
  warrior.setAbility(new AxeAttack());
  warrior.useAbility();

  const mage = new Mage(new MagicSpell());
  mage.useAbility();
  mage.setAbility(new FireBallSpell());
  mage.useAbility();
}

main();
