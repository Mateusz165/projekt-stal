import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { randomBytes } from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;

  // Production: Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${name}`, file, { access: "public" });
    return NextResponse.json({ url: blob.url }, { status: 201 });
  }

  // Local development fallback: write to public/uploads/
  const { default: path } = await import("path");
  const { default: fs } = await import("fs/promises");
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const bytes = await file.arrayBuffer();
  await fs.writeFile(path.join(uploadDir, name), Buffer.from(bytes));
  return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 });
}
