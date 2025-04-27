// /app/robots.txt/route.ts

export async function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://yt-snap.vercel.app/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
