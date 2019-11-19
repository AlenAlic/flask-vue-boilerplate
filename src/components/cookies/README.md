# Cookies

If the website uses non-functional (third party, tracking) cookies, you can enable a cookie message to be shown to the user.

You can also use this just to notify the user that no non-functional cookies are used.

## Config
The app's config object in ```src/config/<env>.js``` contains the following section:

```
cookies: {
    enabled: true,
    type: 'banner' //Or modal
}
```

You can enable the cookie message by setting the enabled flag to true. The type indicates in what way the cookie message should be shown.
Currently you can choose between a banner and a modal.

