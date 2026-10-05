import "./globals.css";

export const metadata = {
    title: "Sistema Escolar",
    description: "Sistema Escolar SESI 323 Mirandópolis",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                {children}
            </body>
        </html>
    );
}