# Wedding Quiz

### Voraussetzungen:

- Beamer sollte FullHD 1080p oder zumindest 720p haben
- Die Webseite ist nur mit dem Chrome Browser getestet

### Vorbereitung:

Das Quiz ist eine Webanwendung die in 2019 mit NodeJS 16 und VueJS 2.6 entwickelt wurde.

1. `yarn install` um die Abhängigkeiten zu installieren 
2. Alle Bilder in den Ordner `public/data` legen (Dateigröße möglichst auf unter 1000px vertikale Kantenlänge reduzieren)
3. Die Datei `_guest.json` im Ordner `public/data` anpassen 
4. `yarn serve` zum starten der App verwenden

Die `_guest.json` Datei startet mit`[` und endet mit einem `]` dazwischen sehen die einzelnen Gruppen so aus:
```
{
  "id": 1,
  "name": "Niklas",
  "picture": "niklas.jpeg"
},
```
Die letzte Gruppe hat allerdings kein `,` nach dem `}`
- Jede `id` darf nur einmal vergeben werden
- hinter `picture` muss genau der Dateiname mit der richtigen Erweiterung `jpg`, `jpeg` etc. stehen

### Benutzung:

1. Am Anfang sieht man eine Übersicht aller geladener Bilder wobei ein paar der Bilder links und rechts aus dem Rand herausgehen. Die Galerie wirkt erst wenn man viele Bilder hat. Durch Klick gelangt man zur Kalender Ansicht
2. In der Kalenderansicht klickt man unten auf "Zur Lotterie" um einen neuen Durchlauf zu starten
3. Am Ende der Lotterie steht als Name nur ???. Durch Klick darauf wird der Name sichtbar.
4. Danach an der rechten unteren Seite auswählen ob es richtig oder falsch war:
  - Bei Falsch wird die Person nicht mehr gezogen
  - Bei Richtig landet man auf der Kalenderübersicht und kann mit Klick auf einen Monat die letzte Person platzieren
5. Um Personen zu tauschen oder neu zuzuweisen kann man erst auf die Person und dann auf einen anderen Monat klicken.
6. Danach wieder auf "Zur Lotterie" um die nächste Runde zu starten

### Kalender zurücksetzen:

Der Kalender bleibt (in der Regel) auch bei einem Neuladen der Webseite erhalten. 
Das Spiel zurückzusetzen ist nicht ganz einfach. Man muss dazu in Chrome mit Cmd+Alt+J (unter Windows Ctrl+Shift+J) die Entwicklertools aufrufen, dann im Reiter "Application" in der linken Seitenleiste auf Storage -> Local Storage -> http://localhost:8080 klicken. Danach in der Tabelle einen Rechtsklick auf den Eintrag `months` und `Delete` klicken. Danach die Webseite neuladen.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
