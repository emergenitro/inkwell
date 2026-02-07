import { NextResponse } from "next/server";
import { createUniqueCode } from "@/lib/utils";
import { signToken, getSession, setTokenCookie } from "@/lib/auth";
import "@/lib/db/db";
import Journal from "@/lib/db/schema";

export async function GET(request) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ code: null, name: null });
    }

    const journal = await Journal.findOne({ code: session.code });

    if (!journal) {
        return NextResponse.json({ code: null, name: null });
    }

    return NextResponse.json({ code: journal.code, name: journal.name });
} 



export async function POST(request) {
    const session = await getSession();
    const { name } = await request.json() || {};

    if (session) {
        const existing = await Journal.findOne({ code: session.code });
        if (existing) {
            existing.name = name;
            await existing.save();
            return NextResponse.json({ code: existing.code, name: existing.name });
        }
    }

    const code = await createUniqueCode(async (code) => {
        const existing = await Journal.findOne({ code: code });
        return !!existing;
    });
    const journal = await Journal.create({ name, code });
    const token = await signToken({ code: journal.code, name: journal.name });
    const response = NextResponse.json({ code: journal.code, name: journal.name });
    return setTokenCookie(response, token);
}
