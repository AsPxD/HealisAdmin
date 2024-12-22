const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Function to generate pharmacy ID
async function generatePharmacyId() {
  const count = await Pharmacy.countDocuments();
  return `PH${String(count + 1).padStart(4, '0')}`;
}

const pharmacySchema = new mongoose.Schema({
  pharmacyId: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'pharmacy',
    enum: ['pharmacy']
  },
  PharmacyName: {  // This is actually pharmacy name as per Login.tsx
    type: String,
    required: true
  },
  experience: {  // Years in operation
    type: Number,
    required: true
  },
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
  location: {
    type: String,
    required: true
  },
  photo: {
    type: String  // URL/path to stored photo
  },
  availability: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
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

// Generate pharmacyId before saving
pharmacySchema.pre('save', async function(next) {
  if (this.isNew) {
    this.pharmacyId = await generatePharmacyId();
  }
  next();
});

// Hash password before saving
pharmacySchema.pre('save', async function(next) {
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
pharmacySchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;