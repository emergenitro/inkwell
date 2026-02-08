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

    const journal = await Journal.findOne({ code: code });

    if (!journal) {
        return new Response(JSON.stringify({ error: "Journal not found" }), { status: 404 });
    }

    const entryData = await request.json();
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