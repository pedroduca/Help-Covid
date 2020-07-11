> HelpCovid é um projeto que foi inspirado no [Ecolixo](https://github.com/pedroduca/EcoLixo)

## Baixando arquivos iniciais

```JS
npm install
```

## Env

Na pasta **backend** vai ter um arquivo chamado
`.host.env`

Adicione seu ip para que você possa usar o mobile

Na pasta **Web** e **Mobile** e só ir na pasta services no arquivo api e trocar para seu ip

> Caso não sabia como pegar seu ip, abra o cmd e digite `ipconfig` e pegue o que estiver em ipv4

## Backend

## Configurando o banco de dados SQLite

```JS
/* NPM */

npm run knex:migrate
npm run knex:seed
```

## Utilizando o programa

```JS
npm run dev
```

## Rotas

### SignUp and SignIn

| Route     | Method | Params                                   | Description       |
| :-------- | :----- | :--------------------------------------- | :---------------- |
| `/signup` | Post   | `name` `email` `password` in body params | Cria um novo user |
| `/signin` | Post   | `email` `password` in body params        | Login             |
