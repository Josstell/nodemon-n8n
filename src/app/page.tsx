import { getQueryClient } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";

export default async  function Home() {
  const queryClient =  getQueryClient();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
    </div>
  );
}
