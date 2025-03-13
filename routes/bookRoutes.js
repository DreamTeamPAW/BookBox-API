const express = require("express");
const router = express.Router();
router.use(express.json())

//endpoint do wszystkich książek
router.get('/', function(req, res){
    res.send("Wszytkie książki");
 });

 //endpoint do wybranej książki
router.get('/:id', (req, res) => {
    res.send("Książka o podanym id")
});

//endpoint do usuwania książek
router.delete('/:id', (req, res) =>{
    res.send("Usunięcie książki o podanym id")
});

module.exports = router;