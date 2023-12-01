import express from "express";
import mysql from "mysql2";
import cors from "cors"

const app=express();
const db=mysql.createConnection({
    host:"localhost", 
    user:"root",
    password:"root",
    database:"test"
})
const PORT=8800;
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send("res from /")
})
app.get('/books',(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        (err)?res.send(err):res.send(data)
    })
})
app.post('/books',(req,res)=>{
    const q="INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    db.query(q,[values],(err,data)=>{
        (err)?res.send(err):res.send("book added successfully!")
    })
})
app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id
    const q="DELETE FROM books WHERE id =?"
    db.query(q,[bookId],(err,data)=>{
        if(err)return res.send(err);
        return res.send("Book has been deleted!")
    })
})

app.put('/books/:id',(req,res)=>{
    const bookId=req.params.id;
    const q="UPDATE books SET `title`=?, `desc`=?,`price`=?,`cover`=? WHERE id=?";
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    db.query(q,[...values,bookId],(err,data)=>{
        (err)?res.send(err):res.send("book updated successfully!")
    })
})


app.listen(PORT,()=>{
    console.log(`connected to ${PORT}`);
})