# Photo Wall application

This small web app allows users to upload photo posts to a photo wall. It uses MongoDB to save the post information, and the file itself is saved on the server filesystem.

## Setup

```bash
npm install

# Run the server
npm start

# Run the tests
npm run test
```

By default, the server connects to MongoDB on the URL `mongodb://localhost/photo-wall`. An environment variable can be provided to configure another connection URL.
