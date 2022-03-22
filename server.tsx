// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const colors:any[] = [];

const app = createApp();

app.post("/", async(req) => {
    const body = await req.formData();
    let color = body.value('color');

    colors.push(color);

    await req.redirect('/');
})

app.handle("/", async(req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),

        body: ReactDOMServer.renderToString(
            <html>
                <head>
                <meta charSet="utf-8" />
                <title>Servidor en Deno</title>
                </head>
                <body style={{backgroundColor: '#000'}}>
                <h1 style={{color: '#fff', textAlign:"center", marginTop:50}}>Pick the color</h1>
                <form style={{width:200, margin:"auto", marginTop:50}} action="/" method="post">
                    <button style={{width:200, textAlign:"center"}}>Send</button>
                    <input style={{width:200, height:100}} type="color" name="color" />
                </form>
                <ul style={{textAlign:"center", marginTop:20, listStyle:"none"}}>
                {
                    colors.map( color => 
                    <li style={{color}}>
                        <b>{color}</b>
                    </li>)
                }
                </ul>
                </body>
            </html>
        ),
    });
});

app.listen({port: 5000})

//! Cambiar a versión 1.8 de Deno para que ande ya que la última versión no tiene funciona servest tira error
//! https://stackoverflow.com/questions/71330388/cant-run-server-with-deno-and-servest