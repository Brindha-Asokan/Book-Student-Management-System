import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    rollNo:
    {
        type: String,
        unique: true,
    },
    userName: {
        type: String,
        required: [true, 'Please add the user name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add the password']
    },
    grade: {
        type: String,
        required: [true, 'Please select the grade'],
    },
}, {
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);
export default Student; 
