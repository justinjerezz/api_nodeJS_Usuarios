

const { application, response } = require('express');
const express=require('express');
const { append } = require('express/lib/response');
const app = express();


var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(express.json());

const users=[
    {id:1, email:'abcd111@abcd.es',age:20, clave:'Prueba2022*', enroll:true},
    {id:2, email:'abcd222@abcd.es',age:20, clave:'Prueba2022*', enroll:true},
    {id:3, email:'abcd333@abcd.es',age:20, clave:'Prueba2022*', enroll:false}
];


app.post('/',(req,res)=>{
    res.send('Node JS api');
});


app.post('/api/users',(req,res)=>{
    res.send(users);
});

app.post('/api/users/:id',(req,res)=>{
    const user=users.find(c=>c.id===parseInt(req.params.id));
    if(!user) return res.status(404).send('Usuario no encontrado');
    else res.send(user);
})


app.post('/api/users', (req,res)=>{
    const user = {
        id: users.length +1,
        name:req.body.name,
        age: parseInt(req.body.age),
        enroll:(req.body.enroll==='true')
    };
    
    users.push(user);
    res.send(user);
})


app.delete('/api/users/:id',(req,res)=>{
    const user=users.find(c=>c.id==parseInt(req.params.id));
    if(!user) return res.status(404).send('Usuario no econtrado');


    const index=users.indexOf(user);
    users.splice(index,1);

    res.send(user);
})

const port = process.env.port || 80;

app.listen(port,()=>console.log(`Escuchando por el puuerto ${port}`));