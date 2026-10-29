# KEITA Sales & Installation

A single-page marketing site for **KEITA Sales & Installation** — DStv & OVHD,
security cameras, TV mounting, gate motors, electric fencing, intercoms and
alarm systems.

Built with plain HTML, CSS and JavaScript. No build step, no dependencies.

## The one feature

Visitors express interest via **WhatsApp**. The form collects a name, the
service needed, and optional area/details, shows a live preview of the message,
then opens a `wa.me` chat with that message pre-filled and ready to send.

Clicking any service card pre-selects it and jumps to the form.

## Run it

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8777
# http://localhost:8777
```

## Configuration

The WhatsApp destination lives at the top of `script.js`:

```js
var WHATSAPP_NUMBER = '27791692899';  // international format, digits only
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup |
| `styles.css` | Styling and responsive layout |
| `script.js` | WhatsApp message builder, validation, service-card wiring |
| `assets/keita-ad.jpeg` | Advert image used in the hero |
