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
    type: String,
    default: "",
  },
  pagesPerWeek: {
    type: String,
    default: "",
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

const bookReadingDefault = {
  pagesLeft: 0,
  bookCompleted: false,
  daysLeft: 0,
  bookTitle: "",
  totalPages: 0,
  bookAuthor: "",
  bookGenre: "",
};

const bookGoalsDefault = {
  yearTotalRead: 0,
  completed: "",
  pagesPerWeek: "",
};

const bookStatsDefault = {
  totalRead: 0,
  monthlyRead: 0,
  readPerDay: 0,
  pagesPerWeek: 0,
};

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
      minlength: 6,
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
      currentReading: {
        type: bookReadingSchema,
        default: bookReadingDefault,
      },
      bookGoals: {
        type: bookGoalsSchema,
        default: bookGoalsDefault,
      },
      bookStats: {
        type: bookStatsSchema,
        default: bookStatsDefault,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
