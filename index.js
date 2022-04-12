const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const express = require('express');
const cors = require('cors');
const firebaseConfig ={
  // your firebase config 
}
const appFire = firebase.initializeApp(firebaseConfig);

const app = express();
const PORT = process.env.PORT || 8877;
let db = firestore.getFirestore(appFire);

async function getImages(db){
    const collenction = firestore.collection(db, 'imagens');
    const Snapshot = await firestore.getDocs(collenction);
    const List = Snapshot.docs.map(doc => doc.data());
    console.log(List);
    return List;
}
var corsOptions = {
    optionsSuccessStatus: 200,
    origin: '*',
    methods: "GET",
}
app.use(cors(corsOptions));

app.get('/', async (req, res)=>{
    let lista = await getImages(db);
    res.json(
        {lista}, 
    )
},)

app.listen(PORT, () => {
    console.log('rodando na porta ' + PORT);
})