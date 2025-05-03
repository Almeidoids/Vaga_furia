import Script from "next/script"

export default function Layout({children}) {
    return(
        <html lang = "pt-br" style = {{padding: 0, margin: 0}}>
            <head>
                <title>Chatbot</title>
            </head>
            <body style = {{padding: 0, margin: 0}}>
                {children}
                <Script src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy = "afterInteractive"/>
            </body>
        </html>
    )
}