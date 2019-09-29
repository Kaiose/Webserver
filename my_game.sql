
use gamedb;

create table UserAccount (
		userid    varchar(40) not null,  
		passwd    char(64) not null,
 		name      varchar(40),
  		score     int,
  		lv        int,
		hp        int,
  		primary key (userid)
);

-- Populate
INSERT INTO UserAccount VALUES('bseo', sha2('test',224), 'Beomjoo Seo', 0, 1,10);

select * from UserAccount where userid='bseo' and passwd=sha2('test',224);