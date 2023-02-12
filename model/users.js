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
          pagesLeft: {
            type: Number,
            default: 0,
          },
          booksCompleted: {
            type: Number,
            default: 0,
          },
          yearTarget: {
            type: Number,
            default: 0,
          },
          totalPagesRead: {
            type: Number,
            default: 0,
          },
          currentBook: {
            title: {
              type: String,
              default: "",
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
