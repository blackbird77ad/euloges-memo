import { UserModel } from "../MODELS/user-model.mjs";
import { userValidator } from "../VALIDATORS/user-validator.mjs";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

//AUTHENTICATION: SIgn-up

export const  signUser = async (req, res, next) => {
    try {
        //Validate the request body
        const { error, value } = userValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details});
        }

        //Check if already a user
        const existingUser = await UserModel.findOne({email: value.email})
        if (existingUser) {
            return res.status(409).json("Already registered!, log in instead");
        }

        // Hash password before saving to database
        const hashedPassword = bcrypt.hashSync(value.password, 10);

        //Save||User to database
        const newUser = await UserModel.create({
            ...value,
            password: hashedPassword,
        });

        // Respond to the request
        return res.status(201).json({
            message: "User successfully registered!",
            user: userWithoutPassword
        });

    } catch (error) {
        next(error)
    }
};

//user login controller
export const SignIn = async (req, res, next) => {
    try{
        //validate login user request
        const {error, value} = userValidator.validate(req.body);
        if (error) {
            res.status(400).json({error: error.details});
        }
        //Find if User exist already
        const user = await UserModel.findOne({email: value.email});
        if (!user) {
            res.status(404).json("User not found");
        }
        // check if value.password match db password
        const correctPassword = await bcrypt.compare(value.password, user.password);
        if (!correctPassword) {
            res.status(404).json("Invalid User Credentials");
        }
        // if value.password matches db user password, enable session|token
        const session = jwt.sign(
            {
                id: user.id, email: user.email
            },
            process.env.JWT_PRIVATE_KEY,
            {
                expiresIn: "24h",
            });
//get current timestamp for user login attempt
        const loginTime = new Date().toLocaleString();

        // respond to request
        return res.status(200).json(
            {
                message: 'User logged in!',
                accessToken: session
            }
        );
    }
    catch (error){
        next(error);
    }
};

