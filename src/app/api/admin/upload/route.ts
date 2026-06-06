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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 1. Cloudinary (Netlify / any platform)
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    const { v2: cloudinary } = await import("cloudinary");
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "projekt-stal", resource_type: "image" },
        (err, res) => (err ? reject(err) : resolve(res as { secure_url: string }))
      ).end(buffer);
    });
    return NextResponse.json({ url: result.secure_url }, { status: 201 });
  }

  // 2. Vercel Blob (Vercel platform)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const name = `uploads/${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
    const { put } = await import("@vercel/blob");
    const blob = await put(name, file, { access: "public" });
    return NextResponse.json({ url: blob.url }, { status: 201 });
  }

  // 3. Local filesystem fallback (dev only)
  const { default: path } = await import("path");
  const { default: fs } = await import("fs/promises");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, name), buffer);
  return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 });
}
