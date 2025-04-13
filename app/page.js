import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Monarch start up </h1>
      <Button>Get Started</Button>
      <ModeToggle />
    </div>
  );
}
