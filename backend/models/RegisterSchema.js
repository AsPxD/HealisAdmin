const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// In the MongoDB User Schema (replace the existing schema)
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['doctor', 'lab', 'pharmacy', 'admin']
  },
  name: String,
  labName: String,
  experience: Number,
  dob: Date,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: String,
  photo: String,
  certificate: String,
  qualifications: [String],
  languagesSpoken: [String],
  availability: {
    days: [String],
    startTime: String,
    endTime: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;