import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Le titre est requis"],
    trim: true,
    minlength: [3, "Le titre doit contenir au moins 3 caractères"],
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pour mettre à jour updatedAt avant chaque modification
TaskSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

export const Task = models.Task || model("Task", TaskSchema);
