import { ImageResponse } from "next/og";

//export const runtime = 'edge';

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
          backgroundColor: 'rgb(16 0 43)',
          backgroundImage: `
            radial-gradient(at center, transparent, rgb(16 0 43) 80%),
            linear-gradient(rgb(255 255 255 / 0.1) 1px, transparent 1px),
            linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px)
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
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
          }}
        >
          <img
            src="https://github.com/bossdaily.png"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
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