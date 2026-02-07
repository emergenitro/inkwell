const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
    name: String,
    code: { type: String, unique: true },
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

const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

module.exports = Journal;