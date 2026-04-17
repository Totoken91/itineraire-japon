import './globals.css'

export const metadata = {
  title: 'Itinéraire Japon',
  description: 'Japan Trip Planner',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
