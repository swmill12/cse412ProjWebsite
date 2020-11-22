const express = require('express')
const path = require('path');
const app = express()
const router = express.Router();
const window = require('window')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const port = 3000

var http = require('http');


app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.sendFile(__dirname+"/views/home.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const bodyParser = require('body-parser')
const cors = require('cors')
const {p} = require('./config/config')


app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const pg = require('pg');


const pool = new pg.Pool({
    user:'Me',
    host:'localhost',
    database:'postgres',
    password:'password',
    port:8010
})


const getBooks = (request, response) => {
    var queryString = 'SELECT speciesName, species.speciesId FROM species, endangeredLevel, location WHERE species.speciesId = endangeredLevel.speciesId AND species.regionId = location.regionId '
    var any = false
    if(request.body.fname != '' && request.body.fname != ' ')
    {
        any = true
        queryString = queryString + ' AND species.speciesName = \'' + request.body.fname +'\''
    }
    else if(request.body.pop != '' && request.body.pop != ' ')
    {
        any = true
        queryString = queryString + ' AND endangeredLevel.population < ' + request.body.pop
    }
    else if(request.body.city != '')
    {
        any = true
        queryString = queryString + ' AND location.city =  \'' + request.body.city +'\''
    }
    else if(request.body.county != '')
    {
        any = true
        queryString = queryString + ' AND location.county =  \'' + request.body.county +'\''
    }
    queryString = queryString + ';'
    if(!any)
    {
        queryString = 'SELECT speciesName, speciesId FROM species;'
    }
    pool.query(queryString , (error, results) => {
        if (error) {
            throw error
        }
        //console.log(request.body.fname)
        //response.status(200).json(results.rows)
        response.render(__dirname + "/views/results.html", {name:results.rows});
    })
    //response.sendFile(__dirname+"/views/results.html");

}

const getDetails = (request, response) => {
    // use radio buttons maybe?
    //response.sendFile(__dirname+"/views/results.html");
    //first animals that it eats
    pool.query('SELECT f.speciesName\n' +
        'FROM species s, species f, eater\n' +
        'WHERE s.speciesId = ' + request.body.Submit  +
        ' AND s.speciesId = eater.predatorId'+ ' AND eater.preyId = f.speciesId;' , (error, results) => {
        if (error) {
            throw error
        }
        var eats =[]
        var i
        for(i = 0; i < results.rows.length; i++)
        {
            eats[i] = results.rows[i]['speciesname']
        }

        pool.query('SELECT eater.plant\n' +
            'FROM species, eater\n' +
            'WHERE species.speciesId = ' + request.body.Submit  +
            ' AND species.speciesId = eater.predatorId'+ ';' , (error, results4) => {
            if (error) {
                throw error
            }
            var x
            for(x = 0; x < results4.rows.length; x++)
            {
                if(results4.rows[x]['plant'] != null) {
                    eats[i+x] = results4.rows[x]['plant']
                }
            }
            //console.log(request.body.fname)
            //response.status(200).json(results.rows)
            console.log(eats)
            pool.query('SELECT s.speciesName\n' +
                'FROM species f, species s, eater\n' +
                'WHERE f.speciesId = ' + request.body.Submit  +
                ' AND f.speciesId = eater.preyId AND eater.predatorId = s.speciesId'+ ';'  , (error, results2) => {
                if (error) {
                    throw error
                }
                var eatenBy = []
                console.log(results2.rows)
                for(i = 0; i < results2.rows.length; i++)
                {
                    eatenBy[i] = results2.rows[i]['speciesname']
                }
                pool.query('SELECT *\n' +
                    'FROM species, location, physicalDescription, endangeredLevel\n' +
                    'WHERE species.speciesId = ' + request.body.Submit  +
                    ' AND species.regionId = location.regionId AND physicalDescription.speciesId = species.speciesId AND endangeredLevel.speciesId = species.speciesId'+ ';' , (error, results3) => {
                    if (error) {
                        throw error
                    }
                    var endangered;
                    if(results3.rows[0] == undefined)
                    {
                        endangered = 'Error'
                    }
                    else if(results3.rows[0]['level'] == 1)
                    {
                        endangered = 'Least Concern'
                    }
                    else if(results3.rows[0]['level'] == 2)
                    {
                        endangered = 'Near Threatened'
                    }
                    else if(results3.rows[0]['level'] == 3)
                    {
                        endangered = 'Vulnerable'
                    }
                    else if(results3.rows[0]['level'] == 4)
                    {
                        endangered = 'Endangered'
                    }
                    else if(results3.rows[0]['level'] == 5)
                    {
                        endangered = 'Critically Endangered'
                    }
                    else if(results3.rows[0]['level'] == 6)
                    {
                        endangered = 'Extinct in the Wild'
                    }
                    else
                    {
                        endangered = 'Extinct'
                    }

                    //console.log(request.body.fname)
                    //response.status(200).json(results.rows)
                    console.log(results3.rows)
                    response.render(__dirname + "/views/details.html", {results:results3.rows[0], eat:eats, eaten:eatenBy, endangered: endangered});
                })
            })
            //response.render(__dirname + "/views/details.html", {results:results3.rows[0]});
        })

    })

}



app
    .route('/search')
    .post(getBooks)
app
    .route('/details')
    // GET endpoint
    .post(getDetails)



