# e-Pass

Aplicativo desenvolvido para melhorar a forma de pagamento dentro dos onibus

## 🤖 Tecnologias usadas

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Knex](http://knexjs.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)

Extras:

- Estilos
  - [EditorConfig](https://editorconfig.org/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)

## 💻 Projeto

   ><p style="margin-left:5em">🏭  &nbsp;&nbsp;&nbsp;&nbsp;./server - API REST usando TypeScript, Express e banco de dados SQLite </p>
   ><p style="margin-left:5em">📱 &nbsp;&nbsp;&nbsp;&nbsp;./mobile - Interface mobile em ReactNative, TypeScript e Expo </p>

### ⚙ Como rodar este projeto

### Pré-requisitos

<b>[GitKraken](https://www.gitkraken.com/)</b>

<b>[Expo](https://expo.io)</b>

E também será preciso um editor, eu indico o <b>[VSCode](https://code.visualstudio.com/)</b>

### 🧭 Rodando o Projeto

```
# Clone o repositório
$ git clone https://github.com/rosooares/nextlevelweek

# Acesse a pasta server e faça as instalações:
$ cd server/

# Instale as dependencias
$ npm install

# Execute as migrations
$ npm knex:migrate

# Execute os seeds
$ npm knex:seed

# Rode a API
$ npm dev
```

