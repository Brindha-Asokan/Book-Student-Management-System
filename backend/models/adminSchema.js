import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add the user name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add the password']
    },
    role: {
        type: String,
        required: [true, 'Please select the role'],
    },
}, {
    timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin; 
