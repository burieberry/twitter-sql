# Twitter.JS

A simple Twitter clone using Express.js features, esp _routing_ and _templating_.

**App features:**
1. A data store to hold our tweets on the server. This is not a persistent database; we will simply be using a JavaScript array to hold objects in the server's RAM.
2. A Twitter-like homepage that lists all tweets from all users.
3. A form to post new tweets.
4. A profile page that displays a specific user's tweets.

**File structure:**
- `app.js` is the main application.
- `public` automatically serves static files when requested.
- `routes` and `views` files let us define dynamic content.

```
    ├── app.js
    ├── package.json
    ├── public
    │   └── stylesheets
    │       └── style.css
    ├── routes
    │   └── index.js
    └── views
        ├── index.html
        └── layout.html
```
