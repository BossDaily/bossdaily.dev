import { ImageResponse } from "next/og";

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#10002b',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, transparent, #10002b),
            linear-gradient(180deg, #ffffff1a 0%, transparent 1px),
            linear-gradient(90deg, #ffffff1a 0%, transparent 1px)
          `,
          backgroundSize: '100% 100%, 80px 80px, 80px 80px',
        }}
      >
        <div
          style={{
            width: '192px',
            height: '192px',
            borderRadius: '96px',
            background: 'white',
            marginBottom: '32px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src="https://github.com/bossdaily.png"
            width={192}
            height={192}
            alt="profile"
          />
        </div>
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          bossdaily.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}