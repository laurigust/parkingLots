import express from 'express'
import mysql from "mysql"
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"parkinglot" 
})


app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.json("hello this is backend")
})

app.get("/parkingFees", (req, res) => {
    const q = "SELECT * FROM parking_fees p, vehicles v where v.vehicle_id = p.vehicle_type";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.get("/specparkingFees/:id", (req, res) => {
    const feeId = req.params.id;
    const q = "SELECT * FROM parking_fees p, vehicles v where v.vehicle_id = p.vehicle_type and p.fee_id = ?";
    db.query(q,[feeId], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.put("/parkingFees/:id", (req, res) => {
    const feeId = req.params.id;
    const q = "UPDATE parking_fees SET `hour_fee`= ? WHERE fee_id = ?";
  
    const values = [
      req.body.hour_fee
    ];
    
    db.query(q, [...values,feeId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
    
  });

 

app.listen(8800, () =>{
    console.log("Connected to backend!")
})