const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    entries: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            content: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
    devices: [String],
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;