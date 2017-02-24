module.exports = {
  "extends": "airbnb",
  "rules": {
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "import/extensions": 0,
    "import/newline-after-import": 0,
    "padded-blocks": 0,
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
  },
  "plugins": ["react", "jsx-a11y", "import"]
};
