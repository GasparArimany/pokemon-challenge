-- create table type(id integer primary key, name text unique on conflict fail);
-- create table move(
--     id integer primary key, 
--     name text unique on conflict fail
--     type integer references type(id);
--     );

-- create table pokemon(id integer primary key, name text unique on conflict fail, type integer references type(id));

-- create table pokemon_move_list(
--     pokemon_id integer references pokemon(id),
--     move_id integer references move(id),
--     primary key(pokemon_id, move_id)
--     );

-- create table player(
--     id integer primary key,
--     name text unique on conflict fail
--     );

-- create table move_set(
--     id integer primary key,
--     move1 integer references move(id),
--     move2 integer references move(id),
--     move3 integer references move(id),
--     move4 integer references move(id),
--     );

-- create table owned_pokemon(
--     player_id integer references player(id),
--     pokemon_id integer references pokemon(id),
--     move_set_id integer references move_set(pokemon_id, move_id),
--     primary key(player_id, pokemon_id)
--     );

create table trainer(id integer primary key autoincrement, name text unique on conflict fail);
insert into trainer (name) values ('Ash Ketchum');

create table owned_pokemon(
    -- TODO: add nickname field
    pokemon_name text not null, 
    pokemon_id integer not null,
    types text not null, -- TODO: change to integer references type(id)
    moves text not null, -- TODO: change to integer references move(id)
    trainer_owner integer not null references trainer(id),
    primary key (pokemon_id, trainer_owner)
);

CREATE INDEX idx_owned_pokemon_trainer_name ON owned_pokemon(pokemon_name, trainer_owner);
