import mongoose from 'mongoose';
import slugify from 'slugify';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImageUrl: {
      type: String,
      required: true,
    },
    otherImages: {
      type: [String], // Array of image URLs
      default: [],
    },
    category:{
      type:String,
    },
    location:{
      type:String,
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Middleware to generate slug before saving
projectSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
