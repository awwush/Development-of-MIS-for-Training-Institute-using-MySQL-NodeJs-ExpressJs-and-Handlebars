require("../models/db/mysql");
const db = require("../models/db/mysql");
const student = require("../models/student");

const jwt = require("jsonwebtoken");
const mailjet = require("node-mailjet").connect(
    "af51f7d633a08ed6f5e4d37efaf822d5",
    "33a5d3fc55a4f69108d006212cdb4b41",
);

function sendMail(name, emailAddress, subject, link, body) {
    // mail format
    // console.log(name, emailAddress, subject, link, body);
    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "1032180848@tcetmumbai.in",
                    Name: "Master-Class",
                },
                To: [
                    {
                        Email: emailAddress,
                        Name: name,
                    },
                ],
                Subject: subject,
                HTMLPart: `Dear ${name} please join the meet.<br>
                If the link doesn't work, please copy paste the below url in a browser window.
                ${link}

                <br>
                <br>
                ${body}
                <br>
                <br>
                <br> Thanking You, <br> Team Master-Class `,
            },
        ],
    });

    request
        .then(
            (mailResponse) => {
                mailResponse.toString = function () {
                    return JSON.stringify(this, null, 4);
                };
                // console.log(
                //     `mail block then promise accept status code: ${mailResponse.response.status}`,
                // );
            },
            (mailResponse) => {
                mailResponse.toString = function () {
                    return JSON.stringify(this, null, 4);
                };
                // console.log(
                //     `mail block then promise reject status code: ${mailResponse.response.status}`,
                // );

                res.send({ "status": "500", "reason": "server error!" });
            },
        )
}

const allStudents = async (req, res) => {

    // console.log(req.body);
    const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

    studentInfo = await db.sequelize.query(
        `SELECT  student.name, student.email FROM student WHERE student.institute_id = '${user.id}'`,
        {
            // replacements: {id: carIds},
            type: db.sequelize.QueryTypes.SELECT,
        },

    );
    // console.log(studentInfo);
    studentInfo.forEach(student => {
        sendMail(student.name, student.email, req.body.subject, req.body.link, req.body.mailBody);
    });

    res.send({
        status: "200",
        reason: "Successfully mailed to the recepients ",
        redirect: `/users/dashboard/${user.email}`
    });
}



const allParents = async (req, res) => {

    // console.log(req.body);
    const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

    parentInfo = await db.sequelize.query(
        `SELECT  student_parent_details.father_name, student_parent_details.mother_name,
         student_parent_details.email FROM student_parent_details WHERE student_parent_details.student_id in 
         (SELECT student.id from student where student.institute_id = '${user.id}')`,
        {
            // replacements: {id: carIds},
            type: db.sequelize.QueryTypes.SELECT,
        },

    );
    // console.log(parentInfo);
    parentInfo.forEach(parent => {
        sendMail(parent.father_name, parent.email, req.body.subject, req.body.link, req.body.mailBody);
    });

    res.send({
        status: "200",
        reason: "Successfully mailed to the recepients ",
        redirect: `/users/dashboard/${user.email}`
    });
}


const allTeachers = async (req, res) => {

    // console.log(req.body);
    const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

    teacherInfo = await db.sequelize.query(
        `SELECT  teacher.name, teacher.email FROM teacher WHERE teacher.institute_id = '${user.id}'`,
        {
            // replacements: {id: carIds},
            type: db.sequelize.QueryTypes.SELECT,
        },

    );
    // console.log(teacherInfo);
    teacherInfo.forEach(teacher => {
        sendMail(teacher.name, teacher.email, req.body.subject, req.body.link, req.body.mailBody);
    });

    res.send({
        status: "200",
        reason: "Successfully mailed to the recepients ",
        redirect: `/users/dashboard/${user.email}`
    });
}

module.exports = { allStudents, allParents, allTeachers };