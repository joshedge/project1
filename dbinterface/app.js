const express = require('express');
const mysql = require('mysql');

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "joshedge_proj",
    password: "proj1pswrD!",
    database: "joshedge_proj"
});

con.connect();

app.use(express.json());

app.get('/COMP351/projects/1/dbinterface', function (req, res) {
    con.query("SELECT questionID, question, answerID, answer1, answer2, answer3, answer4 FROM allQuestions", function(err, results) {
        res.json(results);
    })
});

app.post('/COMP351/projects/1/dbinterface', function(req, res) {
    let question = req.body.question;
    let answerID = req.body.answerID;
    let answer1 = req.body.answer1;
    let answer2 = req.body.answer2;
    let answer3 = req.body.answer3;
    let answer4 = req.body.answer4;
    let sqlQuery = "INSERT INTO allQuestions(question, answerID, answer1, answer2, answer3, answer4) VALUES ('" + question + "', '" + answerID + "', '" + answer1 + "', '" + answer2 + "', '" + answer3 + "', '" + answer4 + "')"
    console.log(sqlQuery);
    con.query(sqlQuery, function (err, result) {
       if (err) {
           res.json({error: err})
       } else {
           res.json({message: "Question added!"})
       }
    });
});

app.put('/COMP351/projects/1/dbinterface', function(req, res) {
    let question = req.body.question;
    let answerID = req.body.answerID;
    let answer1 = req.body.answer1;
    let answer2 = req.body.answer2;
    let answer3 = req.body.answer3;
    let answer4 = req.body.answer4;
    let questionID = req.body.questionID;
    let sqlQuery = "UPDATE allQuestions SET question = '" + question + "', answerID='" + answerID + "', answer1='" + answer1 + "', answer2='" + answer2 + "', answer3='" + answer3 + "', answer4='" + answer4 + "' WHERE questionID='"+questionID+"'";
    console.log(sqlQuery);
    con.query(sqlQuery, function (err, result) {
       if (err) {
           res.json({error: err})
       } else {
           res.json({message: "Question updated!"})
       }
    });
});

app.delete('/COMP351/projects/1/dbinterface', function(req, res) {
    let questionID = req.body.questionID;
    let sqlQuery = "DELETE FROM allQuestions WHERE questionID = '"+questionID+"'";
    console.log(sqlQuery);
    con.query(sqlQuery, function (err, result) {
       if (err) {
           res.json({error: err})
       } else {
           res.json({message: "Question deleted!"})
       }
    });
});



app.listen(console.log('Port is idk'));