import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
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
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64
    },
    picture: {
      type: String,
      default:
        'https://res.cloudinary.com/dzqbzqgjw/image/upload/v1598424851/default_avatar_jxqzqz.png'
    },
    role: {
      type: [String],
      enum: 'CEO'
    }
  },
  { timestamps: true }
)

export default mongoose.model('CEO', userSchema)
