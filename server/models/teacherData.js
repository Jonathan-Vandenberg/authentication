import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    teacherId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    school: {
      type: String,
      trim: true,
      required: true
    },
    absentDays: {
      type: Number,
      default: 0
    },
    warnings: {
      type: Number,
      default: 0
    },
    contract: {
      type: String,
      trim: true,
      required: true
    },
    salary: {
      type: Number,
      default: 0,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    nationality: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    cv: {
      type: String,
      required: true
    },
    passport: {
      type: String,
      required: true
    },
    workPermit: {
      type: String,
      required: true
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
)

export default mongoose.model('TeacherData', userSchema)
