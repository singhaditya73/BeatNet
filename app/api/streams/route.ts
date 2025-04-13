import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.*)?$/;
const SPOTIFY_REGEX = /^(https?:\/\/)?(open\.)?spotify\.com\/(track|playlist|album)\/[\w-]+(\?.*)?$/;

const rateLimitStore = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; 
const MAX_REQUESTS = 5; 

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string().refine(
        (url) => YT_REGEX.test(url) || SPOTIFY_REGEX.test(url),
        { message: "URL must be a valid YouTube or Spotify link" }
    )
});

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        const now = Date.now();

        const userData = rateLimitStore.get(ip) || { count: 0, lastRequest: 0 };
        if (now - userData.lastRequest < RATE_LIMIT_WINDOW) {
            if (userData.count >= MAX_REQUESTS) {
                return NextResponse.json(
                    { message: "Rate limit exceeded. Please try again later." },
                    { status: 429 }
                );
            }
            userData.count += 1;
        } else {
            userData.count = 1;
            userData.lastRequest = now;
        }
        rateLimitStore.set(ip, userData);

        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url);
        const isSpotify = SPOTIFY_REGEX.test(data.url);

        if (!isYt && !isSpotify) {
            return NextResponse.json(
                { message: "Invalid URL format" },
                { status: 400 }
            );
        }

        let extractedId: string | null = null;
        let type: string | null = null;

        if (isYt) {
            extractedId = data.url.split("?v=")[1]?.split("&")[0];
            type = "YouTube";
        } else if (isSpotify) {
            extractedId = data.url.split("/").pop()?.split("?")[0] || null;
            type = "Spotify";
        }

        if (!extractedId) {
            return NextResponse.json(
                { message: "Failed to extract ID from URL" },
                { status: 400 }
            );
        }

        await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type
            }
        });

        return NextResponse.json({ message: "Stream added successfully" });
    } catch (e) {
        return NextResponse.json(
            { message: "Error while adding a stream" },
            { status: 411 }
        );
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    
    try {
        const streams = await prismaClient.stream.findMany({
            where: {
                userId: creatorId
            }
        });
        
        return NextResponse.json(streams);
    } catch (e) {
        return NextResponse.json(
            { message: "Error while fetching streams" },
            { status: 500 }
        );
    }
}