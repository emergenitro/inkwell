import "@/lib/db/db";
import Journal from "@/lib/db/schema";

export async function GET(request, { params }) {
    const { code } = await params;
    
    try {
        const journal = await Journal.findOne({ code: code });
        if (!journal) {
            return new Response(JSON.stringify({ error: "Journal not found" }), { status: 404 });
        }

        return new Response(
            JSON.stringify({
                name: journal.name,
                code: journal.code,
                entries: journal.entries,
                createdAt: journal.createdAt,
                lastModified: journal.lastModified,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error fetching journal:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}