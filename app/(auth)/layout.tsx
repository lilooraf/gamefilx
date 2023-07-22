export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 align-middle">
      {children}
    </div>
  )
}
