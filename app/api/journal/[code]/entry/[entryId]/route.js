import Journal from '@/lib/db/schema';
import { getSession } from '@/lib/auth';
import '@/lib/db/db';

export async function PATCH(request, { params }) {
    const { code, entryId } = await params;
    const entryData = await request.json();

    const session = await getSession();
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const journal = await Journal.findOne({ code: code });

    if (!journal) {
        return new Response(JSON.stringify({ error: 'Journal not found' }), { status: 404 });
    }

    const entryIndex = journal.entries.findIndex(entry => entry._id.toString() === entryId);

    if (entryIndex === -1) {
        return new Response(JSON.stringify({ error: 'Entry not found' }), { status: 404 });
    }

    journal.entries[entryIndex].title = entryData.title || journal.entries[entryIndex].title;
    journal.entries[entryIndex].content = entryData.content || journal.entries[entryIndex].content;
    journal.lastModified = new Date();

    await journal.save();

    return new Response(
        JSON.stringify({
            message: 'Entry updated successfully',
            entry: journal.entries[entryIndex],
        }),
        { status: 200 }
    );
}

export async function DELETE(request, { params }) {
    const { code, entryId } = await params;
    const session = await getSession();

    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const journal = await Journal.findOne({ code: code });

    if (!journal) {
        return new Response(JSON.stringify({ error: 'Journal not found' }), { status: 404 });
    }

    const entryIndex = journal.entries.findIndex(entry => entry._id.toString() === entryId);

    if (entryIndex === -1) {
        return new Response(JSON.stringify({ error: 'Entry not found' }), { status: 404 });
    }

    journal.entries.splice(entryIndex, 1);
    journal.lastModified = new Date();
    await journal.save();
    
    return new Response(JSON.stringify({ message: 'Entry deleted successfully' }), { status: 200 });
}