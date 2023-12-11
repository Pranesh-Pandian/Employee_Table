import express from "express";
import mysql from "mysql";
import cors from "cors"

const app=express()
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pandicodes@01",
    database:"test"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello this is the backend")
})

app.get("/employee",(req,res)=>{
    const q="SELECT * FROM employee"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/employee",(req,res)=>{
    const q="INSERT INTO employee (`id`,`name`,`gender`,`dob`,`age`,`email`,`salary`,`phno`,`dept`) VALUE (?)"
    const values=[req.body.id,req.body.name,req.body.gender,req.body.dob,req.body.age,req.body.email,req.body.salary,req.body.phno,req.body.dept]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Employee detail has been Created!")
    })
})

app.delete("/employee/:id",(req,res)=>{
    const empid=req.params.id;
    const q="DELETE FROM employee WHERE id=?"

    db.query(q,[empid],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Employee removed successfully")
    })
})

app.put("/employee/:id",(req,res)=>{
    const empid=req.params.id;
    const q="UPDATE employee SET (`id`=?,`name`=?,`gender`=?,`dob`=?,`age`=?,`email`=?,`salary`=?,`phno`=?,`dept`=?) WHERE id=?"
    const values=[req.body.id,req.body.name,req.body.gender,req.body.dob,req.body.age,req.body.email,req.body.salary,req.body.phno,req.body.dept]

    db.query(q,[...values,empid],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Employee updated successfully")
    })
})

app.listen(8800,()=>{
    console.log("Connected to backend")
})