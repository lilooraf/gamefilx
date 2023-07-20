export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
    }) {
    return (
        <div className="flex flex-col h-screen align-middle justify-center items-center p-4">
            {children}
        </div>
    );
}