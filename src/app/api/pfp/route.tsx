import { ImageResponse } from "next/og";

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response('Username is required', { status: 400 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <div
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '200px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`https://github.com/${username}.png`}
            width={400}
            height={400}
            alt={`${username}'s profile`}
          />
        </div>
      </div>
    ),
    {
      width: 400,
      height: 400,
    }
  );
}
