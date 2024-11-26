# Descrição

Api desenvolvida com [Adonisjs](https://docs.adonisjs.com/guides/preface/introduction) para registro de clientes, produtos e vendas.
Consiste em uma api simples onde o usuário pode se registrar (signup) e cadastrar seus clientes assim como os produtos e as vendas dos mesmos.

## Rodando

Para vizualizar o funcionamento da aplicação e preciso apenas ter o docker instalado em sua maquína, acredito que a melhor explicação de instalação você encontra na própria [documentação do Docker](https://www.docker.com/).

Após o docker instaldo baixa o código com a cli do git com o seguinte comando:

```bash
$ git clone https://github.com/jhonVitor-rs/simple_store_api.git
```

Agora basta entrar dentro da pasta com o comando:

```bash
$ cd simple_store_api/
```

E rodar o comando:

```bash
$ docker compose up
```

Agora basta aguardar um pouco até que uam mensagen semelhante a esta `started HTTP server on 0.0.0.0:3333` apareça em seu terminal. Em uma primeira vez e provavel que demore alguns minutos para os containers subirem.

Caso você prefira rodar sem o docker, apos baixado os arquivos e entrado na pasta deles execute o comando:

```bash
$ npm install
```

Porém neste caso terá de certificar-se de ter o mysql instalado em sua maquína e configurar corretamente as variaveis de ambiente como no arquivo `.env.example`. Feito isto rode as migrations para criar as tabelas no banco de dados com o comando:

```bash
$ node ace migration:run
```

E então rode o comando:

```bash
$ npm run dev
```

Para rodar em modo de desenvolvimento, ou os comandos:

```bash
$ npm run build && npm start
```

O arquivo api.http tem alguns exemplos de requisições que você pode enviar para testar a api, porém lebre-se de gerar um token com as rotas `/signup`ou `/signin`e envia-lo nas requisições no local onde diz YOUR_TOKEN, caso contrário receberá a resposta de não autorizado.

## Tecnolgias

Foi utilizado o [Adonisjs](https://docs.adonisjs.com/guides/preface/introduction) para a criação da api, e o [Docker](https://www.docker.com/) para criar uma instancia do mysql para banco de dados e para criar uma instância de servidor node para rodar a api, e utilizado o arquivo [wait-for-it.sh](https://github.com/vishnubob/wait-for-it.git) para garantir que container do servidor irá esperar o mysql subir para iniciar seus trabalhos

## Acessando endpoints

### User

Possui dois endpoints, ambos retornarám um token de acesso que deve ser utilizado para acesar as demais rotas:

- `/signup` uma rota post para cadastrar-se na aplicação. Aceita os dados:

```bash
$ {
"fullName": "string",
"email": "string",
"password": "string"
}
```

- `/signin` uma rota post para fazer o login no sistema. Aceita os dados:

```bash
$ {
"email": "string",
"password": "string"
}
```

### Customer

Possui 5 endpoints, em todas deve ser enviado o token de acesso como um Bearer Token, elas retornarma os clientes e detalhes dos mesmos:

- `/custoemrs` uma rota get para retornar todos os clientes. Não leva nenhum argumento.

- `/customers/:id` uma rota get para retornar detalhes de um cliente. Aceita um id obrigtório por parametro e pode aceitar também uma query `yearMonth` para filtrar as vendas, deve ser no formato `yyyy-mm`.

- `/customers` uma rota post para criar um customer, deve receber os dados do cliente, seus telefones e seu endereço.

```bash
{
  "fullName": "string",
  "cpf": "string",
  "phones": [{
    "number": "string",
    "description"?: "string"
  }],
  "address": {
    "publicPlace": "string",
    "number": "string",
    "neighborhood": "string",
    "city": "string",
    "state": "string",
    "complement": "string",
    "zipCode": "string"
  }
}
```

- `/customers/:id` uma rota put ou patch para atualizar o cliente. Ela deve receber um id como parâmentro e no corpo aceita os mesmos campos que a requisição de criação, porem são todos os campos opicionais.

- `/customer/:id` uma rota delete para excluir o cliente. Ela deve receber um id como paramtro de busca.

### Products

Possui 5 rotas, em todas deve ser enviado o token de acesso como um Bearer Token, elas retornarma os produtos e detalhes dos mesmos:

- `/products` uma rota get para buscar todos os produtos

- `/products/:id` uma rota get para detalhar um produto com base no id passado por parámetro

- `/products` uma rota post para criar um produto, ela aceita no corpo da requisição os seguintes campos:

```bash
{
  "name": "string",
  "description": "string",
  "sku": "string",
  "price": float,
  "amount": integer
}
```

- `/products/:id` uma rota put e patch para atualizar o produto com base no id passado por parametro, ela aceita os mesmos campos da rota de criação porém todos são opicionais.

- `/products/:id` uma rota delete para eliminar um produto com base no id passado por parâmetro, ele não será excluido totalmente do banco de dados, será somente marcado como excluido para não constar nas buscas de produtos.

### Sales

Possui uma rota para a criação de vendas, deve ser enviado o token de verificação na requisição, caso tenha sucesso irá retornar a venda e irá descontar do estoque de produtos.

- `/sales` uma rota post, deve receber no corpo da requisição os campos:

```bash
{
  "amount": number,
  "customerId": number,
  "productId": number
}
```

## Considerações finais

Fique a vontade para olhar o código e sugerir melhorias
