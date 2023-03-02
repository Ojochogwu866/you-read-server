const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookReadingSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const bookGoalsSchema = new Schema(
  {
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
  { timestamps: true }
);

const bookStatsSchema = new Schema(
  {
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
  { timestamps: true }
);
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 6,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    bookReading: {
      currentReading: {
        type: bookReadingSchema,
        default: {},
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
//   {
//     name: {
//       type: String,
//       minlength: 6,
//       maxlength: 255,
//     },
//     email: {
//       type: String,
//       maxlength: 255,
//       minlength: 6,
//     },
//     phoneNumber: {
//       type: String,
//       maxlength: 20,
//     },
//     password: {
//       type: String,
//       maxlength: 1024,
//       minlength: 6,
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//     data: {
//       type: mongoose.Schema.Types.Mixed,
//       required: false,
//       bookReading: {
//         _id: {
//           type: String,
//           unique: true,
//           required: true,
//         },
//         currentBook: {
//           pagesLeft: {
//             type: Number,
//             default: 0,
//           },
//           bookCompleted: {
//             type: boolean,
//             default: false,
//           },
//           daysLeft: {
//             type: Number,
//             default: 0,
//           },
//           bookTitle: {
//             type: String,
//             default: "",
//           },
//           totalPages: {
//             type: Number,
//             default: 0,
//           },
//           bookAuthor: {
//             type: String,
//             default: "",
//           },
//           bookGenre: {
//             type: String,
//             default: "",
//           },
//         },
//       },
//       bookGoals: {
//         yearTotalRead: {
//           type: Number,
//           default: 0,
//         },
//         completed: {
//           type: String,
//           default: "",
//         },
//         pagesPerWeek: {
//           type: String,
//           default: "",
//         },
//       },
//       bookStats: {
//         totalRead: {
//           type: Number,
//           default: 0,
//         },
//         monthlyRead: {
//           type: Number,
//           default: 0,
//         },
//         readPerDay: {
//           type: Number,
//           default: 0,
//         },
//         pagesPerWeek: {
//           type: Number,
//           default: 0,
//         },
//       },
//     },
//   },
//   { timestamps: true }
// );
// module.exports = mongoose.model("User", userSchema);
