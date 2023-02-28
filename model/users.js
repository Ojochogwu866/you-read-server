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
      default: {
        bookReading: {
          bookId: {
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
            title: {
              type: String,
              default: "",
            },
            totalPages: {
              type: Number,
              default: 0,
            },
            author: {
              type: String,
              default: "",
            },
            genre: {
              type: String,
              default: "",
            },
          },
        },
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
