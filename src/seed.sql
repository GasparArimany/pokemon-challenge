-- create table trainer(
--     id integer primary key,
--     name text unique on conflict fail
--     );

-- create table party(
--     id integer primary key autoincrement, 
--     trainer_id integer not null references trainer(id), 
--     pkm1 integer references chosen_pokemon(id),
--     pkm2 integer references chosen_pokemon(id),
--     pkm3 integer references chosen_pokemon(id),
--     pkm4 integer references chosen_pokemon(id),
--     pkm5 integer references chosen_pokemon(id),
--     pkm6 integer references chosen_pokemon(id)
-- );

-- create table move_set(
--     id integer primary key,
--     move1 integer,
--     move2 integer,
--     move3 integer,
--     move4 integer,
--     );

-- create table chosen_pokemon(
--     id integer primary key autoincrement,
--     pokemon_id integer not null,
--     move_set_id integer references move_set(pokemon_id, move_id),
--     );



create table trainer(id integer primary key autoincrement, name text unique on conflict fail);
insert into trainer (name) values ('Ash Ketchum');

create table chosen_pokemon(
    id integer primary key autoincrement,
    -- TODO: add nickname field
    pokemon_name text not null on conflict fail, 
    pokemon_id integer not null on conflict fail,
    types text not null on conflict fail, 
    moves text not null on conflict fail,
    trainer_id integer not null on conflict fail references trainer(id)
);

CREATE INDEX idx_chosen_pokemon_trainer_name ON chosen_pokemon(pokemon_name, trainer_id);
CREATE INDEX idx_chosen_pokemon_trainer_id ON chosen_pokemon(pokemon_id, trainer_id);
