create type user_status as enum ('online', 'browsing', 'reading', 'writing', 'thinking', 'busy', 'away', 'offline');
create type user_flag as enum ('unverified', 'verified', 'partner', 'disabled', 'suspended', 'banned');
create type user_type as enum ('standard', 'support', 'admin');

create type story_visibility as enum ('private', 'unlisted', 'public-invite', 'public-open');
create type story_status as enum ('ideation', 'in progress', 'editing', 'complete');

create type post_status as enum ('in progress', 'editing', 'complete');

create table asset (
    id int generated always as identity primary key,
    name varchar(255) not null,
    file varchar(255) not null,
    type varchar(255) not null,
    is_public boolean not null default true,
    created_at timestamp not null default now(),
    deleted_at timestamp
);

create table "user" (
    id int generated always as identity primary key,
    email varchar(255) unique not null,
    username varchar(40) unique not null,
    first_name varchar(20) not null,
    last_name varchar(40),
    description varchar(255),
    status user_status not null default 'online',
    flag user_flag not null default 'unverified',
    type user_type not null default 'standard',
    password varchar(255) not null,
    otp_token varchar(255),
    is_otp boolean not null default false,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp
);

create table user_relation (
    follower_id int not null,
    following_id int not null,
    foreign key (follower_id) references "user"(id),
    foreign key (following_id) references "user"(id),
    primary key (follower_id, following_id)
);

create table backup_code (
    id int generated always as identity primary key,
    user_id int not null,
    token varchar(255) not null,
    created_at timestamp not null default now(),
    foreign key (user_id) references "user"(id)
);

create table session (
    id int generated always as identity primary key,
    user_id int not null,
    token varchar(255) not null,
    ip varchar(11),
    region varchar(255),
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp not null,
    foreign key (user_id) references "user"(id)
);

create table story (
    id int generated always as identity primary key,
    type_id int not null,
    cover_id int,
    title varchar(255) unique not null,
    summary text,
    visibility story_visibility not null default 'private',
    status story_status not null default 'ideation',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp,
    foreign key (type_id) references story_type(id),
    foreign key (cover_id) references asset(id)
);

create table story_user (
    user_id int not null,
    story_id int not null,
    permissions int not null default 0,
    is_creator boolean not null default false,
    foreign key (user_id) references "user"(id),
    foreign key (story_id) references story(id),
    primary key (user_id, story_id)
);

create table story_type (
    id int generated always as identity primary key,
    name varchar(255) unique not null,
    deleted_at timestamp
);

create table story_genre (
    story_id int not null,
    genre_id int not null,
    foreign key (story_id) references story(id),
    foreign key (genre_id) references genre(id),
    primary key (story_id, genre_id)
);

create table genre (
    id int generated always as identity primary key,
    name varchar(255) unique not null,
    deleted_at timestamp
);

create table character (
    id int generated always as identity primary key,
    type_id int,
    story_id int not null,
    first_name varchar(255),
    middle_name varchar(255),
    last_name varchar(255),
    title varchar(20),
    origin varchar(255),
    descriptors text,
    traits text,
    journey text,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp,
    foreign key (type_id) references character_type(id)
);

create table character_art (
    id int generated always as identity primary key,
    asset_id int unique not null,
    character_id int not null,
    foreign key (asset_id) references asset(id),
    foreign key (character_id) references character(id)
);

create table character_relation (
    id int generated always as identity primary key,
    from_id int not null,
    to_id int not null,
    name varchar(255) not null,
    foreign key (from_id) references character(id),
    foreign key (to_id) references character(id),
    unique (from_id, to_id)
);

create table character_type (
    id int generated always as identity primary key,
    name varchar(255) unique not null,
    deleted_at timestamp
);

create table location (
    id int generated always as identity primary key,
    type_id int,
    story_id int not null,
    name varchar(255),
    descriptors text,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp,
    foreign key (type_id) references location_type(id),
    foreign key (story_id) references story(id)
);

create table location_art (
    id int generated always as identity primary key,
    asset_id int unique not null,
    location_id int not null,
    foreign key (asset_id) references asset(id),
    foreign key (location_id) references location(id)
);

create table location_relation (
    id int generated always as identity primary key,
    from_id int not null,
    to_id int not null,
    name varchar(255) not null,
    foreign key (from_id) references location(id),
    foreign key (to_id) references location(id),
    unique (from_id, to_id)
);

create table location_type (
    id int generated always as identity primary key,
    name varchar(255) unique not null,
    deleted_at timestamp
);

create table plot (
    id int generated always as identity primary key,
    story_id int not null,
    title varchar(255) not null,
    summary text,
    position int not null default 1,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp,
    foreign key (story_id) references story(id),
    unique (story_id, position)
);

create table plot_character (
    plot_id int not null,
    character_id int not null,
    foreign key (plot_id) references plot(id),
    foreign key (character_id) references character(id),
    primary key (plot_id, character_id)
);

create table plot_location (
    plot_id int not null,
    location_id int not null,
    foreign key (plot_id) references plot(id),
    foreign key (location_id) references location(id),
    primary key (plot_id, location_id)
);

create table post (
    id int generated always as identity primary key,
    user_id int not null,
    story_id int not null,
    content text not null,
    version int not null default 0,
    views int not null default 0,
    status post_status not null default 'in progress',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp,
    foreign key (user_id) references "user"(id),
    foreign key (story_id) references story(id)
);

create table post_history (
    id int generated always as identity primary key,
    post_id int not null,
    content text not null,
    version int not null,
    created_at timestamp not null default now(),
    foreign key (post_id) references post(id),
    unique (post_id, version)
);

create table post_comment (
    id int generated always as identity primary key,
    post_id int not null,
    user_id int not null,
    comment_id int,
    content text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp,
    foreign key (post_id) references post(id),
    foreign key (user_id) references "user"(id),
    foreign key (comment_id) references post_comment(id)
);

create table post_like (
    post_id int not null,
    user_id int not null,
    foreign key (post_id) references post(id),
    foreign key (user_id) references "user"(id),
    primary key (post_id, user_id)
);
