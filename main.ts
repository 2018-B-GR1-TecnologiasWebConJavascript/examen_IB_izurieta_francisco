import { Pokemon, readFile } from "./utils";
import { prompt, Answers, Separator, Question, objects } from "inquirer";

const findType = (pokemons: Pokemon[], type: string, innertype: string) => {
  console.log('\nBusque los tipos de "' + type + '" en el arreglo `data.json`');
  const tempArray = [];
  pokemons.forEach((pokemon: Pokemon) => {
    pokemon[type].forEach(type => {
      tempArray.push(type[innertype].name);
    });
  });

  const filtered = tempArray.filter(
    (value, index, array) => array.indexOf(value) === index
  );
  const answer = filtered.map(value => {
    return { [innertype]: value };
  });
  console.log(answer);
  return filtered;
};

const sumStats = (pokemons: Pokemon[]) => {
  console.log('\nCalcular la sumatoria de las propiedades de "stats".');
  let speed = 0;
  let special_defense = 0;
  let special_attack = 0;
  let defense = 0;
  let attack = 0;
  let hp = 0;

  pokemons.forEach((pokemon: Pokemon) => {
    speed += pokemon.stats[0].base_stat;
    special_defense += pokemon.stats[1].base_stat;
    special_attack += pokemon.stats[2].base_stat;
    defense += pokemon.stats[3].base_stat;
    attack += pokemon.stats[4].base_stat;
    hp += pokemon.stats[5].base_stat;
  });

  const sum = {
    speedTotal: speed,
    special_defenseTotal: special_defense,
    special_attackotal: special_attack,
    defenseTotal: defense,
    attackTotal: attack,
    hpTotal: hp
  };
  console.log(sum);
};

const totalObject = (pokemons: Pokemon[], object: string) => {
  const objects = pokemons.map((pokemon: Pokemon) => {
    return {
      nombre: pokemon.name,
      [object]: pokemon[object].length
    };
  });
  console.log(objects);
};

const clasify = (
  pokemons: Pokemon[],
  types: any[],
  type: string,
  innertype: string
) => {
  console.log("\nClasifique a los pokemon por `" + type + "`");
  const obj = [];
  types.forEach((value, index) => {
    obj.push({ nombre: value, pokemons: [] });
  });

  pokemons.forEach((pokemon: Pokemon) => {
    pokemon[type].forEach(type => {
      const name = type[innertype].name;
      obj
        .find(value => {
          return value.nombre === name;
        })
        .pokemons.push(pokemon.id);
    });
  });
  console.log(obj);
  return obj;
};

const abilityUsage = (types: any[]) => {
  console.log("\nCalcular cuantos pokemon usan cada habilidad:");
  const answer = types.map(value => {
    return {
      nombre: value.nombre,
      numeroPokemonUsanHabilidad: value.pokemons.length
    };
  });

  console.log(answer);
};

const checkName = (pokemons: Pokemon[]) => {
  const arr = [];
  let a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  for (; a <= z; ++a) {
    arr.push(String.fromCharCode(a));
  }

  const temp = [];

  //   pokemons.forEach((pokemon: Pokemon) => {
  //     arr.findIndex(value => {pokemon.name.charAt(0).toLowerCase)
  //     if () {

  //     }
  //   });
};

const main = async () => {
  const data = await readFile("data.json");
  const pokemons: Pokemon[] = JSON.parse(data);
  const types = findType(pokemons, "types", "type");
  const abilities = findType(pokemons, "abilities", "ability");
  const moves = findType(pokemons, "moves", "move");

  clasify(pokemons, types, "types", "type");
  const pokemonAbilities = clasify(pokemons, abilities, "abilities", "ability");
  clasify(pokemons, moves, "moves", "move");

  sumStats(pokemons);
  console.log(
    "\nRevisar si todos los personajes guardan items **held_items**."
  );
  totalObject(pokemons, "held_items");
  abilityUsage(pokemonAbilities);

  //checkName();
};

main();
