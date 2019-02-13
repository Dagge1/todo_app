Todo aplikacija

Za dev kompajliranje sa parcel js treba u package.json dodati: 
"alias": {
    "vue" : "./node_modules/vue/dist/vue.js"
  }

  Production verzija nalazi se u /dist (index.html i app).. u index.html ispred src="/app.. treba maknuti kosu crtu /