const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    },
    phoneNumber: {
      type: String,
      maxlength: 20,
    },
    password: {
      type: String,
      maxlength: 1024,
      minlength: 6,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      bookReading: {
        _id: {
          type: String,
          unique: true,
          required: true,
        },
        currentBook: {
          pagesLeft: {
            type: Number,
            default: 0,
          },
          bookCompleted: {
            type: boolean,
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
        },
      },
      bookGoals: {
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
      },
      bookStats: {
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
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
