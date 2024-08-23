export const Background: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className="absolute inset-0 z-[-1] h-full w-full bg-BlackRussian bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:12rem_12rem] [mask-image:radial-gradient(ellipse_75%_70%_at_70%_0%,#000_70%,transparent_100%)]" />
      </div>
    </div>
  );
};
