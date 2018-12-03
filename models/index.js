var sql = require('./../db')
var nodemailer = require('nodemailer');

var functions = {
    addToDb :  async function(title,link,body,image){
        return new Promise(async function(resolve, reject) {
            dateNow = new Date();
            var statement = `insert into posts (title,story,link,image, submitDate) values('${title}','${body}','${link}','${image}','${dateNow}')`;

            var row = await sql.run(statement, function(err) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(this.lastID);
                }
            });
        });
    },

    getPost : async function(id){
        return new Promise(async function(resolve, reject) {
            var statement = `select * from posts where id = ${id}`;

            await sql.get(statement,[], function(err,row) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(row);
                }
            });
        });
    },

    getPosts : async function(){
        return new Promise(async function(resolve, reject) {
            var statement = `select * from posts order by submitDate desc limit 5`;

            await sql.all(statement,[], function(err,rows) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(rows);
                }
            });
        });
    },
    getAllPosts : async function(){
        return new Promise(async function(resolve, reject) {
            var statement = `select * from posts order by submitDate`;

            await sql.all(statement,[], function(err,rows) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(rows);
                }
            });
        });
    },

    sendEmail: function( body,email) {
		return new Promise(async function(resolve, reject) {
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'savoymailer@gmail.com',
					pass: 'Mail4321'
				}
			});
			var mailOptions = {
				from: 'email',
				to: 'njstrick@iu.edu',
				subject: 'You recieved mail from your website',
                text: ` ${body} 
                
You can reply to this email by emailing: ${email} `
			};

			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					reject(error);
				} else {
					resolve('Success');
				}
			});
		});
	}
}

module.exports = functions;