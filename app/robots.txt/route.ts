// /app/robots.txt/route.ts

export async function GET() {
  const baseUrl = 'https://yt-snap.vercel.app';

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for better performance
Crawl-delay: 1
`,
    {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}
