module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "padded-blocks": 0,
    "consistent-return": 0,
    "no-extra-boolean-cast": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "react/jsx-no-bind": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react/prefer-stateless-function": 0,
    "import/extensions": 0,
    "import/newline-after-import": 0,
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
