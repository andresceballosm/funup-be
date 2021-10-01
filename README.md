# Instalation

# brew

If you use macOS, install homebrew, it will save you a lot of time.

https://brew.sh/

# Node.js

It is recommended to install `nvm`

```brew update
brew install nvm
source $(brew --prefix nvm)/nvm.sh
```

Then install Node.js 16.5.0 ( fully compatible with M1 macs 😄 )

```
nvm install 16.5.0
```

# Mongodb

The current version is 4.4.9

```
brew install mongodb-community@4.4.9
```

# Run the project

Before running the project, make sure to install all the node dependencies.

```
npm install
```

Then run the project

```
npm run start:dev
```
