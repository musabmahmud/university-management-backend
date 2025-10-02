import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
} from './student.interface';
import { userNameSchema } from '../user/user.model';
import { BloodGroup, Gender } from '../user/user.constant';
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^[A-Za-z\s]{2,50}$/.test(v);
      },
      message: "Father's name must be 2-50 characters long and contain only letters and spaces"
    }
  },
  fatherOccupation: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        if (!v) return true; // Optional field
        return /^[A-Za-z\s]{2,30}$/.test(v);
      },
      message: "Father's occupation must be 2-30 characters long"
    }
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^01[3-9]\d{8}$/.test(v);
      },
      message: "Please provide a valid Bangladeshi phone number (11 digits starting with 01)"
    }
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^[A-Za-z\s]{2,50}$/.test(v);
      },
      message: "Mother's name must be 2-50 characters long and contain only letters and spaces"
    }
  },
  motherOccupation: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        if (!v) return true; // Optional field
        return /^[A-Za-z\s]{2,30}$/.test(v);
      },
      message: "Mother's occupation must be 2-30 characters long"
    }
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^01[3-9]\d{8}$/.test(v);
      },
      message: "Please provide a valid Bangladeshi phone number (11 digits starting with 01)"
    }
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^[A-Za-z\s]{2,50}$/.test(v);
      },
      message: "Local guardian name must be 2-50 characters long"
    }
  },
  occupation: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        if (!v) return true; // Optional field
        return /^[A-Za-z\s]{2,30}$/.test(v);
      },
      message: "Occupation must be 2-30 characters long"
    }
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^01[3-9]\d{8}$/.test(v);
      },
      message: "Please provide a valid Bangladeshi phone number (11 digits starting with 01)"
    }
  },
  address: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        if (!v) return true; // Optional field
        return v.length >= 5 && v.length <= 100;
      },
      message: "Address must be between 5 and 100 characters long"
    }
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User reference is required"],
      unique: true,
      ref: 'User',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: [true, "Academic semester is required"],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, "Academic department is required"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: `{VALUE} is not a valid blood group`,
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      unique: true,
      trim: true
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
      trim: true
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: `{VALUE} is not a valid blood group`,
      },
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian information is required"],
    },
    profileImg: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

studentSchema.virtual('fullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
