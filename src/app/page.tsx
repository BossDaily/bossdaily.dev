
import { Hero } from "@/components/Hero";
import Projects from "@/components/Projects";
import { AboutMe } from "@/components/aboutme/AboutMe";
import { WakatimeData } from "@/components/aboutme/wakatimeInterface";



async function getWakaTimeStats(): Promise<WakatimeData | null> {
  try {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/bossdaily/stats/all_time",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.WAKATIME}`,
        },
        /* next: { 
          revalidate: 3600 // Cache for 1 hour
        } */
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: WakatimeData = await res.json();
    console.log("wakatime data", data.data.human_readable_total);
    return data;
  } catch (error) {
    console.error("Error fetching WakaTime stats:", error);
    return null;
  }
}

export default async function Home() {
  const wakatimeData = await getWakaTimeStats();
  return (
    <>
      <div></div>

      <Hero />

      <Projects />

      <AboutMe wakatimeData={wakatimeData} />
    </>
  );
}
