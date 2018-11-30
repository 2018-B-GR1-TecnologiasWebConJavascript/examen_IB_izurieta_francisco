import * as fs from "fs";

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Temp[];
  game_indices: Game[];
  height: number;
  held_items: Item[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: Temp;
  sprites: {};
  stats: Stat[];
  types: Type[];
  weight: number;
}

interface Ability {
  ability: Temp;
  is_hidden: boolean;
  slot: number;
}

interface Temp {
  name: string;
  url: string;
}

interface Game {
  game_index: number;
  version: Temp;
}

interface Item {
  item: Temp;
  version_details: Version[];
}

interface Version {
  rarity: number;
  version: Temp;
}

interface Move {
  move: Temp;
  version_group_details: VersionGroup[];
}

interface VersionGroup {
  level_learned_at: number;
  move_learn_method: Temp;
  version_group: Temp;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Temp;
}

interface Type {
  slot: number;
  type: Temp;
}

export const readFile = (fileName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      fileName,
      "utf-8",
      (error: NodeJS.ErrnoException, data: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

export const writeFile = (
  fileName: string,
  content: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, (error: NodeJS.ErrnoException) => {
      if (error) {
        reject(error);
      } else {
        resolve("Cambios guardados correctamente.");
      }
    });
  });
};
