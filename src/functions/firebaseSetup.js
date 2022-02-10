const { PROJECT_BY } = require("../utils/config");

// Firebase
exports.PROJECT_ID = "sip-corder";

// Version code
exports.VERSION = "hw1";

// Storage
exports.STORAGE_BUCKET = `${this.PROJECT_ID}.appspot.com`;

// folder path
exports.AUDIO_DATA_FOLDER = `${PROJECT_BY}_${this.VERSION}`;
