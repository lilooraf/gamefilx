import { GamePreviewSkeleton } from "@/components/game/preview/skeleton"

export default function MyLibraryLoadingPage() {
  return (
    <div className="px-4">
      <div className="flex flex-col gap-4">
        <div className="h-8 w-32 animate-pulse rounded-md bg-slate-300 dark:bg-slate-600"></div>
        <div className="flex justify-center md:justify-start">
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from(Array(5).keys()).map((index) => (
              <GamePreviewSkeleton key={index} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
