Todo aplikacija


Za dev kompajliranje sa parcel js treba u package.json dodati: "alias": { "vue" : "./node_modules/vue/dist/vue.js" }

Pokrenuti dev sa: parcel index.html  (parcel treba biti instaliran globalno). Parcel je korišten jer je light projekt 

Production verzija nalazi se u /dist (index.html i app.c328ef1a.js).. u index.html ispred <script src="/app.. treba maknuti backslash /