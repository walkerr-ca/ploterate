create table user_relation (
    follower_id int not null,
    following_id int not null,
    foreign key (follower_id) references "user"(id),
    foreign key (following_id) references "user"(id),
    primary key (follower_id, following_id)
);
