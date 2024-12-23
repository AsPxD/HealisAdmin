const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');

const app = express();

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'healis-secret-key';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dhruvmehta2004:0Tb9LfHuX0jTPQsW@cluster0.bmpyuvt.mongodb.net/HEALIS-ADMIN';
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(cors());

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'care.healis@gmail.com',
    pass: 'mmij azgt thds pxya'
  }
})

// MongoDB User Schema
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
  specialities: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return this.role !== 'doctor' || (Array.isArray(v) && v.length > 0);
      },
      message: 'Doctor must have at least one speciality'
    }
  },
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

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return candidatePassword === this.password; // In production, use proper password hashing
};

const User = mongoose.model('User', userSchema);

// File Upload Configuration
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExt}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and PDF files are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Email sending function
const sendVerificationEmail = async (email, status) => {
  const subject = status === 'verified' 
    ? 'MediSync Pro - Account Verified'
    : 'MediSync Pro - Account Verification Failed';
    
  const text = status === 'verified'
    ? 'Your account has been verified. You can now log in to MediSync Pro.'
    : 'Your account verification was unsuccessful. Please contact support for more information.';

  try {
    await transporter.sendMail({
      from: 'care.healis@gmail.com',
      to: email,
      subject,
      text
    });
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

app.post('/api/register', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'certificate', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Registration request body:', req.body);

    const {
      role,
      name,
      labName,
      experience,
      dob,
      email,
      phone,
      password,
      location,
      qualifications,
      specialities,
      languagesSpoken,
      availableDays,
      startTime,
      endTime
    } = req.body;

    // Base user data
    const userData = {
      role,
      email,
      phone,
      password,
      location,
      experience: experience ? Number(experience) : undefined,
      photo: req.files?.photo ? req.files.photo[0].path : undefined,
      isVerified: false,
      verificationStatus: 'pending'
    };

    // Add role-specific data
    if (role === 'doctor') {
      Object.assign(userData, {
        name,
        dob,
        certificate: req.files?.certificate ? req.files.certificate[0].path : undefined,
        specialities: specialities ? JSON.parse(specialities) : [],
        qualifications: qualifications ? JSON.parse(qualifications) : [],
        languagesSpoken: languagesSpoken ? JSON.parse(languagesSpoken) : [],
        availability: {
          days: availableDays ? JSON.parse(availableDays) : [],
          startTime,
          endTime
        }
      });
    } else if (role === 'lab' || role === 'pharmacy') {
      userData.labName = labName;
    }

    console.log('Processed user data:', userData);

    const user = new User(userData);
    await user.save();

    res.status(201).json({
      message: 'Registration successful. Please wait for admin verification.',
      user: {
        id: user._id,
        role: user.role,
        name: user.name || user.labName,
        email: user.email,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Registration failed',
      error: error.message
    });
  }
});
// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Handle admin login
    if (role === 'admin' && 
        email === 'care.healis@gmail.com' && 
        password === 'Admin@123') {
      const token = jwt.sign(
        { role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        token,
        user: {
          id: 'admin-1',
          role: 'admin',
          name: 'System Administrator',
          email: 'care.healis@gmail.com'
        }
      });
    }

    // Find user
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check verification status
    if (!user.isVerified && user.verificationStatus !== 'verified') {
      return res.status(401).json({ 
        message: 'Account pending verification. Please wait for admin approval.' 
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        name: user.name || user.labName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get all users (admin only)
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
  
      const users = await User.find({});
      res.json(users.map(user => ({
        id: user._id,
        name: user.name || user.labName,
        email: user.email,
        role: user.role,
        status: user.verificationStatus,
        photo: user.photo,
        experience: user.experience,
        location: user.location,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        
        // Additional fields for doctors
        ...(user.role === 'doctor' && {
          qualifications: user.qualifications || [],
          languagesSpoken: user.languagesSpoken || [],
          dob: user.dob,
          certificate: user.certificate,
          availability: user.availability || {
            days: [],
            startTime: '',
            endTime: ''
          }
        }),
  
        // Additional fields for lab and pharmacy
        ...(user.role === 'lab' && {
          labName: user.labName
        }),
        ...(user.role === 'pharmacy' && {
          labName: user.labName
        })
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
  });
// Verify user endpoint (admin only)
app.post('/api/verify-user', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { userId, status } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isVerified = status === 'verified';
    user.verificationStatus = status;
    await user.save();

    // Send email notification
    await sendVerificationEmail(user.email, status);

    res.json({ 
      message: `User ${status === 'verified' ? 'verified' : 'rejected'} successfully`,
      user: {
        id: user._id,
        status: user.verificationStatus
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
      if (req.user.role === 'admin') {
        return res.json({
          id: 'admin-1',
          role: 'admin',
          name: 'System Administrator',
          email: 'care.healis@gmail.com'
        });
      }
  
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a response object with common fields
      const profileResponse = {
        id: user._id,
        role: user.role,
        name: user.name || user.labName,
        email: user.email,
        phone: user.phone,
        location: user.location,
        experience: user.experience,
        photo: user.photo,
        status: user.verificationStatus
      };
  
      // Add role-specific details
      if (user.role === 'doctor') {
        profileResponse.dob = user.dob;
        profileResponse.certificate = user.certificate;
        profileResponse.qualifications = user.qualifications || [];
        profileResponse.languagesSpoken = user.languagesSpoken || [];
        profileResponse.availability = user.availability || {
          days: [],
          startTime: '',
          endTime: ''
        };
      } else if (user.role === 'lab' || user.role === 'pharmacy') {
        profileResponse.labName = user.labName;
      }
  
      res.json(profileResponse);
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({ 
        message: 'Failed to fetch profile', 
        error: error.message 
      });
    }
  });
  const pharmacySchema = new mongoose.Schema({
    role: {
      type: String,
      required: true,
      default: 'pharmacy',
      enum: ['pharmacy']
    },
    labName: {
      type: String,
      required: [true, 'Pharmacy name is required']
    },
    experience: {
      type: Number,
      required: [true, 'Years of experience is required']
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
      required: [true, 'Location is required']
    },
    photo: {
      type: String,
      required: [true, 'Photo is required']
    },
    certificate: {
      type: String,
      required: [true, 'Certificate is required']
    },
    availability: {
      days: [String],
      startTime: {
        type: String,
        required: [true, 'Start time is required']
      },
      endTime: {
        type: String,
        required: [true, 'End time is required']
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
  
  // Password comparison method
  pharmacySchema.methods.comparePassword = async function(candidatePassword) {
    return candidatePassword === this.password; // In production, use proper password hashing
  };
  
  // Method to check if pharmacy is open at given time
  pharmacySchema.methods.isOpen = function(time) {
    if (!this.availability.startTime || !this.availability.endTime) {
      return false;
    }
  
    const [hours, minutes] = time.split(':').map(Number);
    const [startHours, startMinutes] = this.availability.startTime.split(':').map(Number);
    const [endHours, endMinutes] = this.availability.endTime.split(':').map(Number);
  
    const timeInMinutes = hours * 60 + minutes;
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;
  
    return timeInMinutes >= startTimeInMinutes && timeInMinutes <= endTimeInMinutes;
  };
  
  // Virtual for operating hours
  pharmacySchema.virtual('operatingHours').get(function() {
    return `${this.availability.startTime} - ${this.availability.endTime}`;
  });
  
  // Index for faster queries

  
  const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

  // Fixed API Routes - add leading slash
  app.post('/api/pharmacy/register', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const {
        labName,
        experience,
        email,
        phone,
        password,
        location,
        startTime,
        endTime,
        availableDays
      } = req.body;
  
      // Validate required fields
      if (!startTime || !endTime) {
        return res.status(400).json({
          message: 'Start time and end time are required'
        });
      }
  
      // Create pharmacy data object
      const pharmacyData = {
        role: 'pharmacy',
        labName,
        experience: Number(experience),
        email,
        phone,
        password,
        location,
        photo: req.files?.photo ? req.files.photo[0].path : undefined,
        certificate: req.files?.certificate ? req.files.certificate[0].path : undefined,
        availability: {
          days: availableDays ? JSON.parse(availableDays) : [],
          startTime: startTime,
          endTime: endTime
        },
        isVerified: false,
        verificationStatus: 'pending'
      };
  
      console.log('Creating pharmacy with data:', {
        ...pharmacyData,
        password: '[REDACTED]'
      });
  
      const pharmacy = new Pharmacy(pharmacyData);
      await pharmacy.save();
  
      res.status(201).json({
        message: 'Registration successful. Please wait for admin verification.',
        pharmacy: {
          id: pharmacy._id,
          labName: pharmacy.labName,
          email: pharmacy.email,
          status: 'pending'
        }
      });
    } catch (error) {
      console.error('Pharmacy registration error:', error);
      res.status(500).json({
        message: 'Registration failed',
        error: error.message
      });
    }
  });

// Login pharmacy
app.post('/api/pharmacy/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const pharmacy = await Pharmacy.findOne({ email, role: 'pharmacy' });
    if (!pharmacy) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!pharmacy.isVerified && pharmacy.verificationStatus !== 'verified') {
      return res.status(401).json({
        message: 'Account pending verification. Please wait for admin approval.'
      });
    }

    const isMatch = await pharmacy.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    pharmacy.lastLogin = new Date();
    await pharmacy.save();

    const token = jwt.sign(
      { userId: pharmacy._id, role: 'pharmacy' },
      JWT_SECRET,  // Change this line - use JWT_SECRET instead of process.env.JWT_SECRET
      { expiresIn: '24h' }
    );

    res.json({
      token,
      pharmacy: {
        id: pharmacy._id,
        role: 'pharmacy',
        labName: pharmacy.labName,
        email: pharmacy.email
      }
    });
  } catch (error) {
    console.error('Pharmacy login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get all pharmacies (admin only)
app.get('/api/pharmacy/all', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const pharmacies = await Pharmacy.find({});
    res.json(pharmacies.map(pharmacy => ({
      id: pharmacy._id,
      labName: pharmacy.labName,
      email: pharmacy.email,
      phone: pharmacy.phone,
      location: pharmacy.location,
      experience: pharmacy.experience,
      photo: pharmacy.photo,
      certificate: pharmacy.certificate,
      availability: pharmacy.availability,
      status: pharmacy.verificationStatus,
      lastLogin: pharmacy.lastLogin,
      createdAt: pharmacy.createdAt
    })));
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    res.status(500).json({ message: 'Failed to fetch pharmacies', error: error.message });
  }
});

// Get pharmacy profile
app.get('/api/pharmacy/profile', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'pharmacy') {
      return res.status(403).json({ message: 'Pharmacy access required' });
    }

    const pharmacy = await Pharmacy.findById(req.user.userId);
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    res.json({
      id: pharmacy._id,
      role: 'pharmacy',
      labName: pharmacy.labName,
      email: pharmacy.email,
      phone: pharmacy.phone,
      location: pharmacy.location,
      experience: pharmacy.experience,
      photo: pharmacy.photo,
      certificate: pharmacy.certificate,
      availability: pharmacy.availability,
      status: pharmacy.verificationStatus
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// Update pharmacy profile
app.put('/api/pharmacy/profile', authenticateToken, upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'certificate', maxCount: 1 }
]), async (req, res) => {
  try {
    if (req.user.role !== 'pharmacy') {
      return res.status(403).json({ message: 'Pharmacy access required' });
    }

    const pharmacy = await Pharmacy.findById(req.user.userId);
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    const updateData = {
      labName: req.body.labName,
      phone: req.body.phone,
      location: req.body.location,
      experience: Number(req.body.experience),
      availability: {
        days: req.body.availableDays ? JSON.parse(req.body.availableDays) : pharmacy.availability.days,
        startTime: req.body.startTime || pharmacy.availability.startTime,
        endTime: req.body.endTime || pharmacy.availability.endTime
      }
    };

    if (req.files?.photo) {
      updateData.photo = req.files.photo[0].path;
    }
    if (req.files?.certificate) {
      updateData.certificate = req.files.certificate[0].path;
    }

    const updatedPharmacy = await Pharmacy.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      pharmacy: {
        id: updatedPharmacy._id,
        labName: updatedPharmacy.labName,
        email: updatedPharmacy.email,
        status: updatedPharmacy.verificationStatus
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// Verify pharmacy (admin only)
app.post('/api/pharmacy/verify', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { pharmacyId, status } = req.body;
    const pharmacy = await Pharmacy.findById(pharmacyId);
    
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    pharmacy.isVerified = status === 'verified';
    pharmacy.verificationStatus = status;
    await pharmacy.save();

    // Send verification email
    await sendVerificationEmail(pharmacy.email, status);

    res.json({
      message: `Pharmacy ${status === 'verified' ? 'verified' : 'rejected'} successfully`,
      pharmacy: {
        id: pharmacy._id,
        status: pharmacy.verificationStatus
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});
  // Updated Prescription Schema
const prescriptionSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  medications: [{
    type: String,
    required: true
  }],
  recommendations: {
    type: String
  },
  // New fields added
  weight: {
    type: Number,
    min: 0
  },
  bloodPressure: {
    type: String,
    match: /^\d{2,3}\/\d{2,3}$/ // Validates format like 118/78
  },
  heartRate: {
    type: String,
    match: /^\d{2,3}bpm$/ // Validates format like 71bpm
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

// Updated Prescription Creation Route
app.post('/prescriptions', authenticateToken, async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      patientEmail,
      medications,
      recommendations,
      doctorId,
      doctorName,
      weight,
      bloodPressure,
      heartRate
    } = req.body;

    // Create prescription with optional health metrics
    const prescription = new Prescription({
      patientId,
      patientName,
      patientEmail,
      medications,
      recommendations,
      doctorId,
      doctorName,
      weight,
      bloodPressure,
      heartRate
    });

    await prescription.save();

    // Send email to patient (existing email template)
    const emailHtml = createPrescriptionEmailTemplate({
      patientName,
      doctorName,
      medications,
      recommendations,
      date: prescription.date,
      // Optional: Add health metrics to email template if needed
      weight,
      bloodPressure,
      heartRate
    });

    await transporter.sendMail({
      from: '\"HEALIS Healthcare\" <care.healis@gmail.com>',
      to: patientEmail,
      subject: 'New Prescription from Your Doctor',
      html: emailHtml
    });

    res.status(201).json({
      message: 'Prescription created successfully',
      prescription
    });
  } catch (error) {
    console.error('Prescription creation error:', error);
    res.status(500).json({
      message: 'Failed to create prescription',
      error: error.message
    });
  }
});

// Updated Prescription Retrieval Route
app.get('/prescriptions/doctor/:doctorId', authenticateToken, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      doctorId: req.params.doctorId
    }).sort({ date: -1 });
    
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch prescriptions',
      error: error.message
    });
  }
});
app.get('/api/patient-health-metrics/:patientId', authenticateToken, async (req, res) => {
  try {
    const { patientId } = req.params;
    
    // Find all prescriptions for this patient, sorted by date
    const prescriptions = await Prescription.find({ 
      patientId: patientId,
      $or: [
        { weight: { $exists: true } },
        { bloodPressure: { $exists: true } },
        { heartRate: { $exists: true } }
      ]
    })
    .sort({ date: 1 })
    .select('date weight bloodPressure heartRate patientName');

    res.json(prescriptions);
  } catch (error) {
    console.error('Error fetching patient health metrics:', error);
    res.status(500).json({ 
      message: 'Failed to fetch health metrics',
      error: error.message 
    });
  }
});
app.get('/prescriptions/patient/:patientId', authenticateToken, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patientId: req.params.patientId
    }).sort({ date: -1 });
    
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch prescriptions',
      error: error.message
    });
  }
});

const inventorySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  warehouseName: {
    type: String,
    required: true,
    trim: true
  },
  medicineName: {
    type: String,
    required: true,
    trim: true
  },
  medicineUse: {
    type: String,
    required: true,
    trim: true
  },
  composition: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  batchNumber: {
    type: String,
    required: true,
    trim: true
  },
  manufacturingDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const Inventory = mongoose.model('Inventory', inventorySchema);
app.post('/api/inventory', async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    const savedInventory = await newInventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all inventory items with optional filters
app.get('/api/inventory', async (req, res) => {
  try {
    const query = {};
    
    // Add filters if they exist in the query params
    if (req.query.companyName) {
      query.companyName = new RegExp(req.query.companyName, 'i');
    }
    if (req.query.medicineName) {
      query.medicineName = new RegExp(req.query.medicineName, 'i');
    }
    if (req.query.warehouseName) {
      query.warehouseName = new RegExp(req.warehouseName, 'i');
    }

    const inventory = await Inventory.find(query).sort({ createdAt: -1 });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update inventory item
app.put('/api/inventory/:id', async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete inventory item
app.delete('/api/inventory/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  // Email template function
  const createPrescriptionEmailTemplate = ({ patientName, doctorName, medications, recommendations, date }) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">New Prescription from HEALIS Healthcare</h2>
        <p>Dear ${patientName},</p>
        <p>Dr. ${doctorName} has prescribed the following medications for you:</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Medications:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            ${medications.map(med => `<li style="padding: 5px 0;">• ${med}</li>`).join('')}
          </ul>
        </div>
        
        ${recommendations ? `
          <div style="margin: 20px 0;">
            <h3>Additional Recommendations:</h3>
            <p>${recommendations}</p>
          </div>
        ` : ''}
        
        <p>Prescription Date: ${new Date(date).toLocaleDateString()}</p>
        
        <p style="color: #4b5563; font-size: 0.9em; margin-top: 30px;">
          This is an automated message from HEALIS Healthcare. Please do not reply to this email.
        </p>
      </div>
    `;
  };
  /*app.post('/prescriptions', authenticateToken, async (req, res) => {
    try {
      const {
        patientId,
        patientName,
        patientEmail,
        medications,
        recommendations,
        doctorId,
        doctorName
      } = req.body;
  
      // Create prescription
      const prescription = new Prescription({
        patientId,
        patientName,
        patientEmail,
        medications,
        recommendations,
        doctorId,
        doctorName
      });
      await prescription.save();
  
      // Send email to patient
      const emailHtml = createPrescriptionEmailTemplate({
        patientName,
        doctorName,
        medications,
        recommendations,
        date: prescription.date
      });
  
      await transporter.sendMail({
        from: '"HEALIS Healthcare" <care.healis@gmail.com>',
        to: patientEmail,
        subject: 'New Prescription from Your Doctor',
        html: emailHtml
      });
  
      res.status(201).json({
        message: 'Prescription created successfully',
        prescription
      });
    } catch (error) {
      console.error('Prescription creation error:', error);
      res.status(500).json({
        message: 'Failed to create prescription',
        error: error.message
      });
    }
  });
  
  // Get prescriptions for a doctor
  app.get('/prescriptions/doctor/:doctorId', authenticateToken, async (req, res) => {
    try {
      const prescriptions = await Prescription.find({
        doctorId: req.params.doctorId
      }).sort({ date: -1 });
      res.json(prescriptions);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch prescriptions',
        error: error.message
      });
    }
  });
  
  // Get doctor's appointments (for patient list)
 /* app.get('/api/doctor-appointments/:doctorId', authenticateToken, async (req, res) => {
    try {
      // Assuming you have an Appointment model
      const appointments = await Appointment.find({
        'doctor.id': req.params.doctorId
      }).populate('patient');
      
      res.json({ appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ 
        message: 'Failed to fetch appointments',
        error: error.message 
      });
    }
  });  */
// Connect to MongoDB




const MedicineItemSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  medicineName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  medicineUse: {
    type: String,
    required: true
  },
  composition: {
    type: String,
    required: true
  },
  batchNumber: {
    type: String,
    required: true
  },
  manufacturingDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  warehouseName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

const BillingSchema = new mongoose.Schema({
  billNumber: {
    type: String,
    unique: true
  },
  patientDetails: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    patientId: {
      type: String,
      trim: true
    }
  },
  medicines: [MedicineItemSchema],
  billing: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    tax: {
      type: Number,
      required: true,
      min: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    trim: true
  },
  transactionId: {
    type: String,
    trim: true
  },
  billDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'refunded'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Function to generate bill number
async function generateBillNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  // Find the latest bill number for the current month
  const latestBill = await Billing.findOne({
    billNumber: new RegExp(`BILL-${year}${month}-`, 'i')
  }).sort({ billNumber: -1 });

  let count = 1;
  if (latestBill && latestBill.billNumber) {
    // Extract the counter from the latest bill number
    const lastCounter = parseInt(latestBill.billNumber.split('-')[2]);
    count = lastCounter + 1;
  }

  return `BILL-${year}${month}-${count.toString().padStart(4, '0')}`;
}

// Pre-save middleware
BillingSchema.pre('save', async function(next) {
  try {
    if (!this.billNumber) {
      this.billNumber = await generateBillNumber();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Billing = mongoose.model('Billing', BillingSchema);

// API Route
app.post('/api/billing', async (req, res) => {
  try {
    const {
      patientDetails,
      medicines,
      billing,
      paymentMethod
    } = req.body;

    // Calculate totals to ensure data integrity
    const calculatedSubtotal = medicines.reduce((sum, item) => 
      sum + (item.quantity * item.pricePerUnit), 0);
    const calculatedTax = calculatedSubtotal * 0.1; // 10% tax
    const calculatedTotal = calculatedSubtotal + calculatedTax;

    // Validate calculated amounts match submitted amounts
    if (
      Math.abs(calculatedSubtotal - billing.subtotal) > 0.01 ||
      Math.abs(calculatedTax - billing.tax) > 0.01 ||
      Math.abs(calculatedTotal - billing.totalAmount) > 0.01
    ) {
      return res.status(400).json({
        success: false,
        message: 'Billing amounts do not match calculated totals'
      });
    }

    // Create new billing record
    const newBilling = new Billing({
      patientDetails,
      medicines: medicines.map(medicine => ({
        ...medicine,
        totalPrice: medicine.quantity * medicine.pricePerUnit
      })),
      billing: {
        subtotal: calculatedSubtotal,
        tax: calculatedTax,
        totalAmount: calculatedTotal
      },
      paymentMethod,
      paymentStatus: 'pending'
    });

    // Save to database
    const savedBilling = await newBilling.save();

    res.status(201).json({
      success: true,
      data: savedBilling,
      message: 'Billing record created successfully'
    });

  } catch (error) {
    console.error('Billing creation error:', error);
    
    // Send more specific error messages
    const errorMessage = error.code === 11000 ? 
      'Duplicate bill number detected. Please try again.' : 
      error.message || 'Error creating billing record';

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message
    });
  }
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB successfully connected");
})
.catch((error) => {
  console.log("MongoDB connection failed:", error);
  process.exit(1);
});
app.get('/api/verified-doctors', async (req, res) => {
    try {
      const verifiedDoctors = await User.find({ 
        role: 'doctor', 
        isVerified: true, 
        verificationStatus: 'verified' 
      }).select('-password'); // Exclude password field
      res.json(verifiedDoctors);
    } catch (error) {
      console.error('Error fetching verified doctors', error);
      res.status(500).json({ message: 'Failed to fetch doctors' });
    }
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});