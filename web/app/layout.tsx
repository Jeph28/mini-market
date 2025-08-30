export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu',
          background: '#fff',
          color: '#111827',
        }}
      >
        {children}
      </body>
    </html>
  );
}
