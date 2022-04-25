const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: "*"
}));

const db = mysql.createConnection({
    host: "remotemysql.com",
    user: "wym4khPjwJ",
    password: "IpVePeo1GV",
    database: "wym4khPjwJ",
    port: 3306
});

app.get("/employees",(req,res) =>{
  
    db.query("SELECT * FROM contact_db",(error,result) =>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const qualification = req.body.qualification;
    const address = req.body.address;
    const role = req.body.role;
    const salary = req.body.salary;

    db.query("INSERT INTO contact_db(name,qualification,address,role,salary) VALUES (?,?,?,?,?)",[name,qualification,address,role,salary],   (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send('values inserted')
        }
    });
});


app.put("/update",(req,res)=>{
    const id=req.body.id;
    // const name = req.body.name;
    // const qualification = req.body.qualification;
    // const address = req.body.address;
    // const role = req.body.role;
    const salary = req.body.salary;

    // db.query("UPDATE contact_db SET name=?,qualification=?,address=?,role=?,salary=? WHERE Id=?",
    // [name,qualification,address,role,salary,id],(error,result)=>{
    db.query("UPDATE contact_db SET salary = ? WHERE id = ?",[salary,id],(error,result) => {
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    })
})


app.delete("/delete/:id",(req,res) =>{
    const id = req.params.id
    db.query("DELETE FROM contact_db WHERE id = ?",id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result)
        }
    })
})

app.listen(4000, () => {
    console.log("Node JS Server is running on port 4000")
})