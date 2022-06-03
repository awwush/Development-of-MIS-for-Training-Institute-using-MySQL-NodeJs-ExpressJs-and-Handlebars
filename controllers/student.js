require("../models/db/mysql");
const db = require("../models/db/mysql");
const { student } = require("../models/student");
const { class_model } = require("../models/class");
const jwt = require("jsonwebtoken");
const { class_student_details } = require("../models/class_student_details");
const { student_fee } = require("../models/student_fee_details");
const { student_parent } = require("../models/student_parent_details");
const { sequelize } = require("../models/db/mysql");



const get_fees = async (req, res, next) => {
    var fullFees = 0;

    console.log("Entering the Test env");

    await req.body.class.forEach(async (ele) => {
        //     sequelize.query(`INSERT into class_student_details VALUES (${ele},${response.dataValues.id})`,
        //     {
        //         type: sequelize.QueryTypes.INSERT,
        //     });

        await class_model.findOne({
            attributes: ["fees"],
            where: {
                id: ele
            }
        }).then((responsee) => {
            fullFees += parseInt(responsee.dataValues.fees);
            console.log(" fees individuak : " + responsee.dataValues.fees);
        })

        console.log(" in the loop, out of then");

    })

    console.log("out of loop");

    next();
}

const count_students = async (req, res) => {

    const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

    student.findAndCountAll(
        {
            where: {
                institute_id: user.id,
            }
        }
    ).then((responses) => {
        res.send({ "status": "200", "count": `${responses.count}` });
    })
        .catch(err => {
            // console.log(err);
            res.send({ "status": "500", "count": "0" });
        })
}

const get_class = async (req, res) => {
    class_model.findAll({
        attributes: ["id", "name", "fees"],
        where: {
            board_id: req.query.board_id,
            standard_id: req.query.standard_id,

        }
    })
        .then((responses) => {
            var arrayToSend = []
            responses.forEach((response) => {
                arrayToSend.push(response.dataValues);
            })
            console.log(arrayToSend);
            res.send(arrayToSend);
        }).catch((err) => {
            res.send([{ status: 500 }]);
        })
}

const save_student = async (req, res) => {
    console.log(req.body);
    const password = require('crypto').randomBytes(7).toString('hex');
    const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
    var studentBirthday = req.body.birthday;
    if (req.body.birthday == "") {
        studentBirthday = null;
    }
    student.create({
        name: req.body.studentName,
        date_of_birth: studentBirthday,
        contact: req.body.studentMobNo,
        email: req.body.studentEmail,
        board_id: req.body.studentBoard,
        standard_id: req.body.studentStandard,
        verification: 0,
        password: password,
        institute_id: user.id,
    }).then(async (response) => {

        // console.log("inside after saving in Student");
        student.findOne({
            attributes: ["id"],
            where: {
                email: req.body.studentEmail,
            }
        }).then(async (response) => {
            var fullFees = 0;
            req.body.class.forEach((ele) => {
                sequelize.query(`INSERT into class_student_details VALUES (${ele},${response.dataValues.id})`,
                    {
                        type: sequelize.QueryTypes.INSERT,
                    });

                // class_model.findOne({
                //     attributes : ["fees"],
                //     where: {
                //         id : ele
                //     }
                // }).then((responsee) => {
                //             fullFees +=   parseInt(responsee.dataValues.fees);
                //             console.log(" fees individuak : " + responsee.dataValues.fees);
                //         })

            })


            var today = new Date();
            sequelize.query(`INSERT into student_fee_details VALUES (${response.dataValues.id},'${fullFees}','0','${fullFees}','${today.getFullYear() + '-' + parseInt(today.getMonth() + 4) + '-' + today.getDate()}')`,
                {
                    type: sequelize.QueryTypes.INSERT,
                });
            sequelize.query(`INSERT into student_parent_details VALUES (${response.dataValues.id},'${req.body.fatherName}','${req.body.motherName}','${req.body.parentEmail}','${req.body.parentMobNo}')`,
                {
                    type: sequelize.QueryTypes.INSERT,
                });

            res.send({ status: 200, reason: "Saved successfully!" });
            // Todo: 3) in future try sending the Admission letter to the student in the mail. 
        })

    }).catch((err) => {

        // console.log(err);
        if (err.fields.contact_UNIQUE != undefined) {
            res.send({ status: "422", reason: ` student contact already exists` });
        }
        if (err.fields.email_UNIQUE != undefined) {
            res.send({ status: "422", reason: ` student email already exists` });
        }
        //unique value check here!!

        // res.send({ status: 500, reason: "Server Error, Unable to Save Details!!" });
    })


}

const edit_student = async (req, res) => {
    const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

    console.log(req.body);
    var mess = "";
    if (req.body.nameq == "") mess += "name, ";
    if (req.body.mobNo == "") mess += "mobile no, ";

    if (mess != "") {
        mess += " required!";
        res.send({ "status": "422", "reason": mess });
        return;
    }

    // if (req.body.birthday == "") bday = null;
    // else {
    // 	var date = new Date(req.body.birthday);
    // 	var bday = date.toISOString().slice(0, 19).replace("T", " ");
    // }

    student
        .update({
            name: req.body.nameq,
            contact: req.body.mobNo,
        }, {
            where: {
                id: req.body.id,
            }
        })
        .then((response) => {
            // console.log(response);
            // console.log(`student update ${response}`);
            if (response == 0) { // no row to be updated
                res.send({
                    status: "422",
                    reason: "No change requested",
                });
                return;
            } else {
                res.send({
                    status: "200",
                    reason: "Successfully modified student Details!! ",
                    redirect: `/admin/student/list`
                });

            }

            // student
            //     .findOne({
            //         attributes: ["id"],
            //         where: {
            //             id: req.body.id,
            //         },
            //     })
            //     .then((response) => {
            //         // console.log(req.body.subject); // array of all the subjects selected
            //         // console.log(response.dataValues.id); // students id
            //         req.body.subject.forEach((subject) => {
            //             db.sequelize.query(
            //                 `INSERT INTO teacher_subject_details VALUES (${response.dataValues.id},${subject})`,
            //                 {
            //                     type: db.sequelize.QueryTypes.INSERT,
            //                 },
            //             );
            //         });
            //     });

        })
        .catch((err) => {
            // console.log(`student update catch ${err}`);
        });
};

const delete_student = async (req, res) => {
    const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
    if (user.id) {
        console.log(user.id);
        // console.log(req.body);

        student.destroy({
            where: {
                contact: req.body.mobNo
            }
        }).then((response) => {
            // console.log(`accepted ${response}`);
            res.send({
                "status": "200",
                "reason": "deleted successfully",
                "redirect": `/admin/student/list`
            })
        }, (response) => {
            console.log(`rejected ${response}`);
            res.send({
                "status": "422",
                "reason": "coudn't delete"
            })
        })
            .catch((err) => {
                res.send({
                    "status": "422",
                    "reason": "deletion failed, server error"
                })
            })

    }
}

const list_students = async (req, res) => {

    const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

    var students = await db.sequelize.query(
        `SELECT student.id as id, student.name as name, student.contact as mobile, student.email as email,
        student.date_of_birth as date_of_birth, boards_available.short_form as board_name, boards_available.id as board_id,
        standards_available.name as standard_name, standards_available.id as standard_id
        from student, boards_available, standards_available where student.institute_id = '${user.id}'
        and boards_available.id=student.board_id and standards_available.id = student.standard_id`,
        {
            // replacements: {id: carIds},
            type: db.sequelize.QueryTypes.SELECT,
        },

    );
    // console.log(students);
    res.render("student_list", { "title": "list of students", students });

}

const list_classes = async (req, res) => {

    const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
    // console.log(req.params.id);

    classes = await db.sequelize.query(
        `SELECT  class.id, class.name FROM class WHERE class.institute_id = '${user.id}'
		and class.id in 
	    (SELECT class_student_details.class_id from class_student_details
		where class_student_details.student_id = ${req.params.id})`,
        {
            // replacements: {id: carIds},
            type: db.sequelize.QueryTypes.SELECT,
        },

    );
    // console.log(classes);
    res.send(classes);


}

const list_un_enrolled_classes = async (req, res) => {

    const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
    // console.log(req.params.id);

    // TODO: deal with the fees section as it is not completed yet.

    unEnrolledClasses = await db.sequelize.query(
        `SELECT class.id, class.name, class.fees FROM class
        WHERE class.institute_id = '${user.id}'
		and class.board_id = '${req.query.board_id}'
        and class.standard_id = '${req.query.standard_id}'
        and class.id not in 
	    (SELECT class_student_details.class_id from class_student_details
		where class_student_details.student_id = '${req.query.student_id}')`,
        {
            // replacements: {id: carIds},
            type: db.sequelize.QueryTypes.SELECT,
        },

    );
    // console.log(unEnrolledClasses);
    res.send(unEnrolledClasses);


}

const show_parents = async (req, res) => {

    const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

    var parentData = await db.sequelize.query(
        `SELECT *
        from student_parent_details where student_parent_details.student_id = '${req.params.id}'`,
        {
            // replacements: {id: carIds},
            type: db.sequelize.QueryTypes.SELECT,
        },

    );
    // console.log(parentData);
    res.send(parentData);

}

const add_class = async (req, res) => {
    // console.log(req.body);
    req.body.class.forEach((ele) => {
        sequelize.query(`INSERT into class_student_details VALUES (${ele},${req.body.id})`,
            {
                type: sequelize.QueryTypes.INSERT,
            })
            .then((response) => {
                // console.log(response);
                res.send({
                    "status": "200",
                    "reason": "Added successfully",
                    "redirect": "/admin/student/list",
                });
            }).catch(err => {
                console.log(err);
                console.log(`couldn't add the class with id ${ele}`);
            });
    })
}

const delete_class = async (req, res) => {
    // console.log(req.body);
    req.body.class.forEach((ele) => {
        sequelize.query(`DELETE FROM class_student_details where class_id = ${ele} and student_id = ${req.body.id}`,
            {
                type: sequelize.QueryTypes.DELETE,
            })
            .then((response) => {
                // console.log(response);
                res.send({
                    "status": "200",
                    "reason": "Deleted successfully",
                    "redirect": "/admin/student/list",
                });
            }).catch(err => {
                console.log(err);
                console.log(`couldn't delete the class with id ${ele}`);
            });
    })
}

module.exports = {
    count_students,
    get_class,
    save_student,
    edit_student,
    delete_student,
    get_fees,
    list_students,
    list_classes,
    list_un_enrolled_classes,
    show_parents,
    add_class,
    delete_class
};