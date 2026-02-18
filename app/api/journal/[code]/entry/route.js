import "@/lib/db/db";
import Journal from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import mongoose from "mongoose";

export async function POST(request, { params }) {
    const { code } = await params;
    const session = await getSession();

    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    if (session.code !== code) {
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const journal = await Journal.findOne({ code: code });

    if (!journal) {
        return new Response(JSON.stringify({ error: "Journal not found" }), { status: 404 });
    }

    const entryData = await request.json();

    if (!entryData.title || entryData.title.length > 200) {
        return new Response(JSON.stringify({ error: "Title must be between 1 and 200 characters" }), { status: 400 });
    }
    if (!entryData.content || entryData.content.length > 50000) {
        return new Response(JSON.stringify({ error: "Content must be between 1 and 50,000 characters" }), { status: 400 });
    }

    const newEntry = {
        _id: new mongoose.Types.ObjectId(),
        title: entryData.title,
        content: entryData.content,
        timestamp: new Date(),
    };

    journal.entries.push(newEntry);
    journal.lastModified = new Date();
    await journal.save();

    return new Response(
        JSON.stringify({
            message: "Entry added successfully",
            entry: newEntry,
        }),
        { status: 201 }
    );
}