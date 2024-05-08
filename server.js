import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";
import http, { request } from "http";

const app = express();
const server = http.createServer(app);

app.use(cors({
    credentials: true,
    origin: "*"
}));

app.use(express.json({ limit: "10mb" }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gallery"
});
//  const connection = mysql.createConnection({
//    host: "db4free.net",
//    user: "vcentry",
//    password: "test@123",
//    database: "travelix",
//    port: 3306
// });

connection.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("MYSQL Server has been connected");
    }
})

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/create/image
// Method : POST
app.post("/api/create/image", (request, response) => {
    const sql_query = `INSERT INTO image_gallery (Name, Image) 
      VALUES ('${request.body.Name}', '${request.body.Image}')`

    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("Image has been uploaded ");
        }
    })
})
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/read/image
// Method : GET
app.get("/api/read/image", (request, response) => {
    const sql_query = `SELECT * FROM image_gallery`;

    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send(result)
        }
    })
})
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/delete/image
// Method : DELETE

app.delete("/api/delete/image/:id", (request, response) => {
    const sql_query = `DELETE FROM image_gallery WHERE id=${request.params.id}`;
    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("Deleted successfully");
        }
    })
})


const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log("Server is Running");
})