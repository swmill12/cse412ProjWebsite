// Config file for creating tables
// Creating it here so don't have to use makefile

const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const pg = require('pg');

const pool = new pg.Pool({
    user:'Me',
    host:'localhost',
    database:'postgres',
    password:'password',
    port:8010
})


pool.query('DROP TABLE IF EXISTS eater;\n' +
    'DROP TABLE IF EXISTS physicalDescription;\n' +
    'DROP TABLE IF EXISTS location;\n' +
    'DROP TABLE IF EXISTS endangeredLevel;\n' +
    'DROP TABLE IF EXISTS species;\n'+
    'CREATE TABLE location(\n' +
    'city text,\n' +
    'county text not null,\n' +
    'habitat text,\n' +
    'weather text,\n' +
    'regionId smallint not null,\n' +
    'PRIMARY KEY(regionId)\n' +
    ');\n' +
    '\n' +
    'CREATE TABLE species(\n' +
    'class text,\n' +
    'family text,\n' +
    'speciesId smallint not null,\n' +
    'speciesName text,\n' +
    'regionId smallint,\n' +
    'PRIMARY KEY(speciesId)\n' +
    ');\n' +
    '\n' +
    'CREATE TABLE physicalDescription(\n' +
    'speciesId smallint not null,\n' +
    'size text,\n' +
    'color text,\n' +
    'weight text,\n' +
    'isPoisonous boolean,\n' +
    'isVenomous boolean,\n' +
    'lifeSpan int,\n' +
    'FOREIGN KEY(speciesId) REFERENCES species(speciesId) ON DELETE CASCADE\n' +
    ');\n' +
    '\n' +
    'CREATE TABLE eater(\n' +
    'predatorId smallint not null,\n' +
    'preyId smallint,\n' +
    'plant text,\n' +
    'FOREIGN KEY(predatorId) REFERENCES species(speciesId) ON DELETE CASCADE,\n' +
    'FOREIGN KEY(preyId) REFERENCES species(speciesId) ON DELETE CASCADE\n' +
    ');\n' +
    '\n' +
    'CREATE TABLE endangeredLevel(\n' +
    'speciesId smallint not null,\n' +
    'level smallint,\n' +
    'population int,\n' +
    'dateOfEndager date,\n' +
    'FOREIGN KEY(speciesId) REFERENCES species(speciesId) ON DELETE CASCADE\n' +
    ');\n' +
    '\n' +
//'INSERT INTO species VALUES(null,null,-1,null,1); ' +
    'INSERT INTO species VALUES' +
    '(\'mammal\',\'dog\',3,\'Mexican Wolf\',2),'+
    '(\'mammal\',\'cat\',4,\'Jaguar\',2),' +
    '(\'mammal\',\'cat\',5,\'Ocelot\',2),'+
    '(\'bird\',\'owl\',6,\'Mexican Spotted Owl\',2),'+
    '(\'fish\',\'fish\',7,\'Desert Pupfish\',13),'+
    '(\'bird\',\'vulture\',8,\'California Condor\',7),'+
    '(\'mammal\',\'rodent\',9,\'New Mexico meadow jumping mouse\',16),'+
    '(\'fish\',\'fish\',10,\'Bonytail chub\',17),'+
    '(\'mammal\',\'ungulate\',11,\'Sonoran pronghorn\',15),'+
    '(\'mammal\',\'bat\',12,\'Lesser Long-Nosed bat\',18),'+
    '(\'amphibian\',\'salamander\',13,\'Sonora Tiger Salamander\',19),'+
    '(\'reptiles\',\'snake\',14,\'Narrow-headed gartersnake\',4),'+
    '(\'bird\',\'rail\',15,\'Yuma Clapper rail\',17),'+
    '(\'reptile\',\'snake\',16,\'New Mexican Ridge-Nosed rattlesnake\',15),'+
    '(\'mammal\',\'weasel\',17,\'black\sfootedvferret\',14),'+
    '(\'mammal\',\'dog\',18,\'Black Footed Prairie Dog\',14),'+
    '(\'reptile\',\'tortoise\',19,\'Desert Tortoise\',20),'+
    '(\amphiban\',\'frog\',20,\'Chiricahua leopard frog\',4);'
    +
    // Location
    'INSERT INTO location VALUES(\'Tempe\',\'Maricopa\',\'Desert\',\'Dry\',2),' +
    '(\'Mesa\',\'Maricopa\',\'Desert\',\'Dry\',3),' +
    '(\'Tuscon\',\'Maricopa\',\'Desert\',\'Dry\',4),' +
    '(\'Scottsdale\',\'Pima\',\'Desert\',\'Dry\',5),' +
    '(\'Sedona\',\'Maricopa\',\'Desert\',\'Dry\',6),' +
    '(\'Flagstaff\',\'Yavapai\',\'Desert\',\'Dry\',7),' +
    '(\'Prescott\',\'Coconino\',\'Desert\',\'Dry\',8),' +
    '(\'Gilbert\',\'Yavapai\',\'Desert\',\'Dry\',9),' +
    '(\'Glendale\',\'Maricopa\',\'Desert\',\'Dry\',10),' +
    '(\'Peoria\',\'Maricopa\',\'Desert\',\'Dry\',11),' +
    '(\'Yuma\',\'Yuma County\',\'Desert\',\'Dry\',12),' +
    '(\'Duncan\',\'Greenlee\',\'Desert\',\'Dry\',13),' +
    '(\'Aubrey Valley\',\'Yavapai\',\'Desert\',\'Dry\',14),' +
    '(\'Sonoran Desert\',\'Pima\',\'Desert\',\'Dry\',15),' +
    '(\'White Mountains\',\'Greenlee\',\'Desert\',\'Dry\',16),' +
    '(\'Phoenix\',\'Maricopa\',\'Desert\',\'Dry\',17),' +
    '(\'Picaho\',\'Pinal\',\'Desert\',\'Dry\',18),' +
    '(\'San Rafael Valley\',\'Santa Cruz\',\'Desert\',\'Dry\',19),'+
    '(\'Kingman\',\'Mohave\',\'Desert\',\'Dry\',20);'
    +
    //physicalDescription
    'INSERT INTO physicaldescription VALUES' +
    '(3,\'Medium\',\'Grey\',65,false,false,10),' +
    '(4,\'Large\',\'Yellow\',115,false,false,13),' +
    '(5,\'Small\',\'Brown\',30,false,false,13),' +
    '(6,\'Small\',\'Brown\',1,false,false,15),' +
    '(16,\'Small\',\'Brown\',2.5,false,true,8),' +
    '(12,\'Small\',\'Brown\',0.048,false,false,12),' +
    '(7,\'Small\',\'Blue\',1,false,false,1),' +
    '(8,\'Large\',\'Black\',22,false,false,50),' +
    '(9,\'Small\',\'Brown\',1,false,false,1),' +
    '(10,\'Medium\',\'Blue\',2,false,false,30),' +
    '(11,\'Large\',\'Brown\',120,false,false,11),' +
    '(13,\'Small\',\'Grey\',NULL,false,false,NULL),' +
    '(14,\'Medium\',\'Grey\',NULL,false,false,NULL),' +
    '(15,\'Small\',\'Brown\',1,false,false,NULL),'+
    '(19,\'Medium\',\'Brown\',15,false,false,50),'+
    '(20,\'Small\',\'Green\',1,false,false,18);'
    +
    //eater
    'INSERT INTO eater VALUES(9,null,\'Grass\'),' +
    '(18,null,\'Grass\'),' +
    '(9,null,\'Flowers\'),' +
    '(18,null,\'Roots\'),' +
    '(17,18,null),' +
    '(16,18,null),' +
    '(6,9,null),' +
    '(12,null,\'Cacti\'),' +
    '(6,12,null),'+
    '(3,null,null),' +
    '(4,7,null),' +
    '(4,10,null),' +
    '(4,19,null),' +
    '(5,7,null),' +
    '(5,9,null),' +
    '(5,14,null),' +
    '(5,15,null),' +
    '(7,null,null),' +
    '(8,11,null),' +
    '(10,null,null),' +
    '(11,null,null),' +
    '(13,null,null),' +
    '(14,null,null),' +
    '(15,null,null),'+     
    '(19,null,\'Grass\'),'+
    '(20,null,null,null);'
    +
    //endangeredLevel
    'INSERT INTO endangeredlevel VALUES' +
    '(3,6,143,\'4-28-1976\'),' +
    '(4,7,10,\'3-28-1972\'),' +
    '(5,7,5,\'3-28-1972\'),' +
    '(6,4,2000,\'3-16-1993\'),' +
    '(7,5,NULL,\'3-31-1986\'),' +
    '(8,5,440,\'3-11-1967\'),' +
    '(9,5,NULL,\'7-10-2014\'),' +
    '(10,5,500,\'2-05-2012\'),' +
    '(11,5,NULL,\'3-11-1967\'),' +
    '(12,2,100000,\'3-23-2015\'),' +
    '(13,5,NULL,\'1-06-1997\'),' +
    '(14,3,3500,\'7-08-2014\'),' +
    '(15,2,15000,\'10-01-2016\'),'+
    '(19,3,190000,\'7-01-1980\'),'+
    '(20,3,10000,\'7-20-1998\');'
    

    , (err, res) => {
        console.log(err, res);
    }
)
