const express = require('express')
const { MongoClient } = require('mongodb')
require('dotenv').config()
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId


const app = express();
const port =process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json())


// Connect Mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zyicn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run () {

    try{
    await client.connect();
        const database = client.db("worldTour");
        const servicesCollection = database.collection("trips");
        

        
       
       
        // Get Api
        app.get('/tours', async(req,res) => {
            const cursor = servicesCollection.find({});
            const tours = await cursor.toArray();
            res.send(tours);
            

        })
        //Get Single Service
        app.get('/tours/:id', async(req,res) => {
            const id = req.params.id;
            console.log('getting service by id', id);
            const query = { _id: ObjectId(id)};
            const tour = await servicesCollection.findOne(query)
            res.json(tour);
        })


        ///Get First 6 Data


        app.get('/tours', async(req,res) => {
            const cursor = servicesCollection.find({});
            const tours = await cursor.limit(6).toArray();
            res.send(tours)
        })


        //Delete Api
        // app.delete('/services/:id', async(req,res) => {
        //     const id = req.params.id;
        //     const query  = { _id: ObjectId(id)};
        //     const result  = await servicesCollection.deleteOne(query);
        //     res.json(result);
        // })

        //POST API 
        // app.post('/services', async(req,res) => {
        //     const service = req.body
        //     console.log('Hitthe post api' , service);

        //     const result = await servicesCollection.insertOne(service);
        //     console.log(result)
        //     res.json(result);
        // })



    }


    finally{
        // await client.close()
    }

}
run().catch(console.dir)




















app.get('/', (req,res) => {
    res.send('Running Travele Server')
    });
    
    app.listen(port, () => {
        console.log('Running Travele Server on Port ', port)
    })