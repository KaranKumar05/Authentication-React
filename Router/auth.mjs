import express from 'express';
let router = express.Router();
import jwt from 'jsonwebtoken'
import { stringToHash, varifyHash } from 'bcrypt-inzi'
import { client } from '../mongoDb.mjs'
const userCollection = client.db('JWTAuthReact').collection("Users");

router.post('/login', async (req, res, next) => {
    if (
        !req.body.email
        || !req.body.password
    ) {
        res.status(403).send(
            `Required Parameters Missing
                Please Fill All the Fields
                email : "abc@gmail.com"
                Password: "Password"`
        );
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    try {
        let result = await userCollection.findOne({ email: req.body.email });
        console.log(result);

        if (!result) {
            res.status(403).send({
                message: "Email & Password Incorrect"
            });
            return;
        } else {
            const isMatch = await varifyHash(req.body.password, result.password)
            if (isMatch) {
                const token = jwt.sign({
                    isAdmin: result.isAdmin,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: req.body.email,
                }, process.env.SECRET_KEY, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + (1000 * 60 * 60))//Token Expires After 1 Hr
                })
                res.send({
                    message: "Login Successfully",
                    data: {
                        isAdmin: result.isAdmin,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                    }

                });
            } else {
                res.status(403).send({
                    message: "Email & Password Incorrect"
                });
                return;
            }
        }
    } catch (err) {
        console.log(`Error:${err}`);
        res.status(500).send('Server Error Please try Again Later');
    }
});




router.post('/signup', async (req, res, next) => {
    if (
        !req.body?.firstName
        || !req.body?.lastName
        || !req.body?.email
        || !req.body?.password
    ) {
        res.status(403).send(
            `Required Parameters Missing
                Please Fill All the Fields
                
                firstName : "xyz",
                lastName : "abc",
                email : "abc@gmail.com",
                password: "Password"`
        );
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    try {
        let result = await userCollection.findOne({ email: req.body.email });
        // console.log(result);

        if (!result) {
            const passwordHash = await stringToHash(req.body.password)
            const insertResponse = await userCollection.insertOne({
                isAdmin: false,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordHash,
                CreatedOn: new Date()
            });
            // console.log(`Insert Response: ${insertResponse}`);
            console.log(`Insert Response: ${insertResponse}`);
            res.send({
                message: "Signup Successfully",
            })
        } else {
            res.status(403).send({
                message: "User Already Exist"
            });
        }
    } catch (err) {
        console.log(`Error:${err}`);
        res.status(500).send('Server Error Please try Again Later');
    }
});

export default router;