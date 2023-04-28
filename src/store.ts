import { proxy } from "valtio";
import { devtools } from "valtio/utils";

const MONSTER_ZONE = 3;
const MAGIC_ZONE = 4;
export const DECK_ZONE = 5;

export interface CardState {
  id: number; // 每张卡在场上的唯一标识
  zone: number;
  defense: boolean;
}

interface MatState {
  monsters: CardState[];
  magics: CardState[];
  deck: CardState[];
  move: (reverse?: boolean) => void;
}

export const store = proxy<MatState>({
  monsters: [
    { id: 0, zone: MONSTER_ZONE, defense: false },
    { id: 1, zone: MONSTER_ZONE, defense: false },
  ],
  magics: [
    { id: 2, zone: MAGIC_ZONE, defense: false },
    { id: 3, zone: MAGIC_ZONE, defense: false },
    { id: 4, zone: MAGIC_ZONE, defense: false },
  ],
  deck: [{ id: 5, zone: DECK_ZONE, defense: false }],
  move(reverse?: boolean) {
    if (reverse) {
      const moved = store.magics.pop();
      if (moved) {
        moved.zone = MONSTER_ZONE;
        store.monsters.push(moved);
      }
    } else {
      const moved = store.monsters.pop();
      if (moved) {
        moved.zone = MAGIC_ZONE;
        store.magics.push(moved);
      }
    }
  },
});

devtools(store, { name: "valtio store", enabled: true });
