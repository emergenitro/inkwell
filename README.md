# Inkwell - My simplistic journaling app?

Yeah, so, I just wanted to create a minimalistic website which allows people to journal as soon as they start. No sign-up, nothing liddat. Just start.

## How I might run through this
### General Framework
Frontend & Backend handled by Next
DB handled by Mongo

### API Routes
```js
POST   /api/journal                      // Create journal & returns code
GET    /api/journal/[code]               // Get journal + ALL entries
POST   /api/journal/[code]/entry         // Add new entry
PATCH  /api/journal/[code]/entry/[id]    // Edit entry
DELETE /api/journal/[code]/entry/[id]    // Delete entry
```

