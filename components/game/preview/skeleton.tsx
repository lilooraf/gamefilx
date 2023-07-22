export const GamePreviewSkeleton: React.FC<{
  delay: number
}> = ({ delay }) => {
  return (
    <li
      className="flex h-40 w-72 animate-pulse rounded-md bg-gray-200 p-2 dark:bg-gray-900"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="h-32 w-20 self-center rounded-md bg-slate-300 dark:bg-slate-600"></div>
      <div className="space-y-2 p-2">
        <div className="h-4 w-40 rounded-md bg-slate-300 dark:bg-slate-600"></div>
        <div className="h-4 w-20 rounded-md bg-slate-300 dark:bg-slate-600"></div>
        <div className="h-4 w-10 rounded-md bg-slate-300 dark:bg-slate-600"></div>
      </div>
    </li>
  )
}
