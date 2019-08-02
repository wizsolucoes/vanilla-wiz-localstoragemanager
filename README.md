# Vanilla Wiz LocalStorageManager

Lib js feita em **Vanilla JS** para gerenciar e ofuscar dados sensíveis no localStorage;

## Preparação da ambiente local

Está api faz uso de [node](https://nodejs.org/en/), para configurar localmente o projeto é necessário executar o seguinte comando, na raiz do projeto:

```bash
> npm install
```

## Organização do projeto

```bash
├── src
    ├── index.js
    ├── lib
        ├── wiz-localstorage-manager.js
```

**index.js** -> Arquivo padrão de exportação da lib.
**wiz-localstorage-manager** -> arquivo aonde estão as principais classes do projeto:


## Utilização da lib

Essa lib foi preparada para uso via empacotamento logo ela poderá ser utilizada via importação. Para fazer a instalação do package via npm basta executar o comando:

```bash
> npm install 'git+https://github.com/wizsolucoes/vanilla-wiz-localstoragemanager' --save
```

Para utilizá-la basta importar a classe utilizando o código a seguir:

```js
import WizLocalStorageManager from '@wizsolucoes/wiz-localstoragemanager';
```

## Documentação da Classe **WizLocalStorageManager**

### Instanciando a classe:

Para utilizar os recursos da classe é necessário criar uma instância da classe. Para isso é obrigatório passar um objeto [config](#objeto-config) conforme o exemplo a seguir:

```js
import WizLocalStorageManager from '@wizsolucoes/wiz-localstoragemanager';

var storage = new WizLocalStorageManager({config})

```

#### Objeto Config:

O objeto config deve possuir as seguintes propriedades

* scope: escopo referente ao componente exemplo: *caso* 
* tokenFromUI: chave de criptografia exemplo: *0123431231241231*
* keySize: tamanho da chave, exemplo: *16*


```js
var storage = new WizLocalStorageManager({
      scope: 'exemplo',
      tokenFromUI: '0123431231241231',
      keySize: 16,
    });
```


### Propriedades e metódos da classe:
#### Todos os métodos já incluem o escopo na Key automaticamente .

* **setItem(key, value);** método da classe que armazena no localStorage o item;

* **setItemEncrypt(key, value);** método da classe que armazena no localStorage o item criptografado;

* **getItem(key);** método da classe que recupera o item no localStorage, retorno String;

* **getItemEncrypt(key);** método da classe que recupera o item no localStorage criptografado, retorno String;

* **getItemEncryptJson(key);** método da classe que recupera o item no localStorage criptografado, retorno JSON;

* **getItemJson(key);** método da classe que recupera o item no localStorage, retorno JSON;

* **killLocalStorageMyScope();** método da classe que apaga todos os itens que contém  o scopo no localStorage;

* **killLocalStorageContainsScope(value);** método da classe que apaga todos os itens que contém o scopo(value) no localStorage.



## Exemplo completo

```js
   var core = new WizLocalStorageManager({
      scope: 'login',
      tokenFromUI: '0123456789123456',
      keySize: 16,
    });


    var conteudo = '{"nome":"HUGO RICCHINO","cpf":"123124124123","empresa":"WIZ SOLUÇÕES E CORRETAGEM DE SEGUROS S/A.","matricula":"123","situacao":"ATIVIDADE NORMAL"}';
    ///////////SET///////////
    //método da classe que armazena no localStorage o item;
    core.setItem('colaborador', conteudo);

    //método da classe que armazena no localStorage o item criptografado;
    core.setItemEncrypt('colaborador-criptografado', conteudo);

    ///////////GET///////////
    //método da classe que recupera o item no localStorage, retorno String;
    console.log(core.getItem('colaborador'));

    //método da classe que recupera o item no localStorage criptografado, retorno String;
    console.log(core.getItemEncrypt('colaborador-criptografado'));

    //método da classe que recupera o item no localStorage criptografado, retorno JSON;
    console.log(core.getItemEncryptJson('colaborador-criptografado'));

    //método da classe que recupera o item no localStorage, retorno JSON.
    console.log(core.getItemJson('colaborador'));

    ///////////DELET///////////
    core.killLocalStorageMyScope();
    core.killLocalStorageContainsScope('login');



```
