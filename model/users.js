const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookReadingSchema = new Schema({
  pagesLeft: {
    type: Number,
    default: 0,
  },
  bookCompleted: {
    type: Boolean,
    default: false,
  },
  daysLeft: {
    type: Number,
    default: 0,
  },
  bookTitle: {
    type: String,
    default: "",
  },
  totalPages: {
    type: Number,
    default: 0,
  },
  bookAuthor: {
    type: String,
    default: "",
  },
  bookGenre: {
    type: String,
    default: "",
  },
});

const bookGoalsSchema = new Schema({
  yearTotalRead: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Number,
    default: 0,
  },
  pagesPerWeek: {
    type: Number,
    default: 0,
  },
});

const bookStatsSchema = new Schema({
  totalRead: {
    type: Number,
    default: 0,
  },
  monthlyRead: {
    type: Number,
    default: 0,
  },
  readPerDay: {
    type: Number,
    default: 0,
  },
  pagesPerWeek: {
    type: Number,
    default: 0,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 6,
      maxlength: 255,
    },
    email: {
      type: String,
      maxlength: 255,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 1024,
    },
    bookReading: {
      required: false,
      currentReading: {
        type: [bookReadingSchema],
        default: [],
      },
      bookGoals: {
        type: bookGoalsSchema,
        default: {},
      },
      bookStats: {
        type: bookStatsSchema,
        default: {},
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
