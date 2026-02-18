const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
    name: { type: String, maxlength: 20 },
    code: { type: String, unique: true },
    entries: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            title: { type: String, maxlength: 200 },
            content: { type: String, maxlength: 50000 },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    devices: [String],
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
});

const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

module.exports = Journal;