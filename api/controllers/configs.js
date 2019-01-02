const mongoose = require("mongoose");
const config = mongoose.model("config");

var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

module.exports.login = function(req, res) {

    if (!req.body.password) {

        return res.status(400).send("No password given.");

    }

    // default : HMAC SHA256
    var token = jwt.sign({
        login: true   // 토큰의 내용(payload)
    },
    secretObj.secret ,  // 비밀 키
    {
        expiresIn: '60m'  // 유효 시간은 5분
    })
 
    config.findOne( { "key":"password" },function(findError,doc){

        if (findError) {

            return res.status(500).send(findError);

        } else if (doc == null) {

            return res.status(403).send("No password config found.");

        } else {
            console.log("로그인 체크", doc.value, req.query.password, doc.value === req.query.password)
            if (doc.value === req.body.password) {
                res.cookie("login_token", token);
                res.json({
                    token: token
                })
            } else {
                return res.status(401).send("비밀번호 오류");
            }

        }

    });
}

module.exports.signup = function(req, res) {

    if (!req.body.password) {

        return res.status(400).send("No password given.");

    }

    // default : HMAC SHA256
    var token = jwt.sign({
        login: true   // 토큰의 내용(payload)
    },
    secretObj.secret ,  // 비밀 키
    {
        expiresIn: '60m'  // 유효 시간은 5분
    })
 
    config.create({

        key:'password',
        value:req.body.password,
        

    }, function(createError, message) {

        if (createError) {

            return res.status(500).send(createError);

        } else {

            res.cookie("login_token", token);
            res.json({
                token: token
            })

            // return res.send(message);

        }

    });
}

/*
router.get("/someAPI", function(req, res, next){
    let token = req.cookies.login_token;
   
    let decoded = jwt.verify(token, secretObj.secret);
    if(decoded){
      res.send("권한이 있어서 API 수행 가능")
    }
    else{
      res.send("권한이 없습니다.")
    }
  })
  
*/
