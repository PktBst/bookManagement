import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

const Books = () => {
    const [books,setBooks]=useState([]);
    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try{
                const res=await axios.get("http://localhost:8800/books")
                console.log(res)
                setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])
    const handleDelete =async (id)=>{
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <h1>Bookstore</h1>
        <div className="books">
            {books.map(book=>(
                <div className="book" key={book.id}>
                    {book.cover && <img src="" alt=""/>}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <button onClick={()=>handleDelete(book.id)}>delete</button>
                    <button><Link to={`/update/${book.id}`}>update</Link></button>
                </div>
            ))}
        </div>
        <button><Link to="/add">Add new book</Link></button>
    </div>
  )
}

export default Books