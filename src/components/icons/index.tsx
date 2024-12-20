import React from 'react';
import {
  Activity,
  Beaker,
  Stethoscope,
  Pill,
  Settings,
  Syringe
} from 'lucide-react';

// Navigation Icons
export const NavIcons = {
  Doctors: Stethoscope,
  Lab: Beaker, // Using Beaker instead of Flask
  Pharmacy: Pill,
  Admin: Settings
};

// Feature Icons
export const FeatureIcons = {
  Logo: Activity,
  DoctorConsultations: Stethoscope,
  LabManagement: Beaker,
  PharmacyServices: Pill,
  VaccinationTracking: Syringe
};