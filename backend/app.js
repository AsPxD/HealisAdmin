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
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
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
  app.post('/prescriptions', authenticateToken, async (req, res) => {
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