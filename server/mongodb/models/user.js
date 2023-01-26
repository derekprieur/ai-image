import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const User = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// static signup method
User.statics.signup = async function (email, password) {
    // validation 
    if (!email || !password) {
        throw Error("Email and password are required");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is invalid");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        password: hash,
    });

    return user;
};

// static login method
User.statics.login = async function (email, password) {
    // validation 
    if (!email || !password) {
        throw Error("Email and password are required");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("User does not exist");
    }

    console.log(password, user.password)
    const match = await bcrypt.compare(password, user.password);
    console.log(match)
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

const UserSchema = mongoose.model("User", User);

export default UserSchema;