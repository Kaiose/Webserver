
use WebIDE;

drop table if exists Project;
drop table if exists UserAccount;

create table UserAccount (
		userid    varchar(40) not null,  
		passwd    char(64) not null,
 		name      varchar(40),
		primary key (userid, passwd)
);

create table Project(
		userid varchar(40) not null,
		projectName varchar(40) not null,
		filepath char(128),
		modifydate timestamp DEFAULT CURRENT_TIMESTAMP,
		primary key (userid , projectName),
		FOREIGN KEY (userid) REFERENCES UserAccount (userid)
);



-- Populate
INSERT INTO UserAccount VALUES('kinam', sha2('1234',224), 'Kinam Kim');
INSERT INTO Project(userid,projectName,filepath) VALUES('kinam', 'finalproject', 'C:/Bitnami/wampstack-7.1.29-0/apache2/htdocs/');


select * from UserAccount where userid='kinam' and passwd=sha2('1234',224);
select * from Project where userid='kinam' and projectName='finalproject';