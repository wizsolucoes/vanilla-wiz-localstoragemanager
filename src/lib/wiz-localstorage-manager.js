import * as CryptoJS from 'crypto-js';

export class WizLocalStorageManager {
    //Configurações globais
    constructor(config) {
        this.config = config;
        this.config.saveAsJSON = this.config.saveAsJSON == null ? true : this.config.saveAsJSON;
        this.config.localStorageEncrypt = this.config.localStorageEncrypt == null ? true : this.config.localStorageEncrypt;
        //if (this.config.scope) throw new Error("O campo scope é obrigatório!");
    }


    //Funções min localStorageManager

    /////////////////////////////SET//////////////////////////////////

    //Salvar Item localStorage com Scope
    setItem(key, value) {
        this.saveLocalStorage(value, {
            _saveAsJSON: false,
            _encrypt: false,
            _name: key
        })
    }

    setItemNoScope(key, value) {
        this.saveLocalStorageNoScope(value, {
            _saveAsJSON: false,
            _encrypt: false,
            _name: key
        })
    }

    setItemNoScopeEncrypt(key, value) {
        this.saveLocalStorageNoScope(value, {
            _saveAsJSON: false,
            _encrypt: true,
            _name: key
        })
    }
    
    //Salvar Item tipo JSON localStorage com Scope
    setItemJson(key, value) {
        this.saveLocalStorage(value, {
            _saveAsJSON: true,
            _encrypt: false,
            _name: key
        })
    }
    //Salvar Item  localStorage com Scope criptografado 
    setItemEncrypt(key, value) {
        this.saveLocalStorage(value, {
            _saveAsJSON: false,
            _encrypt: true,
            _name: key
        })
    }

    //Salvar Item tipo JSON localStorage com Scope criptografado
    setItemEncryptJson(key, value) {
        this.saveLocalStorage(value, {
            _saveAsJSON: true,
            _encrypt: true,
            _name: key
        })
    }

    /////////////////////////////GET//////////////////////////////////

    //Recuperar item localStorage com Scope específico 
    getItemScope(scope, value) {
        return this.getLocalStorageScope({
            _name: value,
            _scope: scope,
            _encrypt: false,
            _saveAsJSON: false
        });
    }
    //Recuperar item localStorage com Scope específico: retorno JSON
    getItemScopeJson(scope, value) {
        return this.getLocalStorageScope({
            _name: value,
            _scope: scope,
            _encrypt: false,
            _saveAsJSON: true
        });
    }
    //Recuperar item localStorage criptografado com Scope específico: retorno JSON
    getItemScopeEncryptJson(scope, value) {
        return this.getLocalStorageScope({
            _name: value,
            _scope: scope,
            _encrypt: true,
            _saveAsJSON: true
        });
    }
    //Recuperar item localStorage com Scope específico: retorno String
    getItemScopeEncrypt(scope, value) {
        return this.getLocalStorageScope({
            _name: value,
            _scope: scope,
            _encrypt: true,
            _saveAsJSON: false
        });
    }

    //Recuperar item localStorage com Scope
    getItem(value) {
        return this.getLocalStorage({
            _name: value,
            _encrypt: false,
            _saveAsJSON: false
        });
    }

    //Recuperar item que foi salvo como JSON no localStorage com Scope
    getItemJson(value) {
        return this.getLocalStorage({
            _name: value,
            _encrypt: false,
            _saveAsJSON: true
        });
    }

    //Recuperar item localStorage criptografado com Scope
    getItemEncrypt(value) {
        return this.getLocalStorage({
            _name: value,
            _encrypt: true,
            _saveAsJSON: false
        });
    }


    //Recuperar item que foi salvo como JSON no localStorage criptografado com Scope
    getItemEncryptJson(value) {
        return this.getLocalStorage({
            _name: value,
            _encrypt: true,
            _saveAsJSON: true
        });
    }


    /////////////////////////////DELET//////////////////////////////////

    //Deletar todos os Itens do localStorage com o Scopo padrão
    killItens() {
        this.killLocalStorageMyScope();
    }

    //Apagar todos os itens que contem value:string 
    killItemScope(value) {
        this.killLocalStorageContainsScope();
    }



    //Criptografar
    encrypt(content, _saveAsJSON = null) {
        _saveAsJSON = _saveAsJSON == null ? this.config.saveAsJSON : _saveAsJSON;

        return this._encryptUsingAES256(content, _saveAsJSON);
    }
    //Descriptografar
    decrypt(content, _saveAsJSON = null) {
        _saveAsJSON = _saveAsJSON == null ? this.config.saveAsJSON : _saveAsJSON;

        return this._decryptUsingAES256(content, _saveAsJSON);
    }

    saveLocalStorageNoScope(content, config) {
        if (config._name) {
            config._saveAsJSON = config._saveAsJSON == null ? this.config.saveAsJSON : config._saveAsJSON;
            config._encrypt = config._encrypt == null ? this.config.localStorageEncrypt : config._encrypt;

            if (config._encrypt == true) {
                window.localStorage.setItem(config._name, this.encrypt(content))
            }
            else {
                window.localStorage.setItem(config._name, content);
            }
        } else {
            console.log("Por favor preencher o campo _name.")
        }
    }

    //Salvar item no localStorage passando configurações
    saveLocalStorage(content, config) {
        if (config._name) {
            config._saveAsJSON = config._saveAsJSON == null ? this.config.saveAsJSON : config._saveAsJSON;
            config._encrypt = config._encrypt == null ? this.config.localStorageEncrypt : config._encrypt;

            if (config._encrypt == true) {
                window.localStorage.setItem(this.config.scope + '-' + config._name, this.encrypt(content))
            }
            else {
                window.localStorage.setItem(this.config.scope + '-' + config._name, content);
            }
        } else {
            console.log("Por favor preencher o campo _name.")
        }
    }
    //Recuperar item localStorage passango configurações
    getLocalStorage(config) {
        if (config._name) {
            config._encrypt = config._encrypt == null ? this.config.localStorageEncrypt : config._encrypt;
            config._saveAsJSON = config._saveAsJSON == null ? this.config.saveAsJSON : config._saveAsJSON;

            if (config._encrypt == true) {
                if (config._saveAsJSON) {
                    return JSON.parse(this.decrypt(window.localStorage.getItem(this.config.scope + '-' + config._name)));
                } else {
                    return this.decrypt(window.localStorage.getItem(this.config.scope + '-' + config._name));
                }

            } else {
                if (config._saveAsJSON) {
                    return JSON.parse(window.localStorage.getItem(this.config.scope + '-' + config._name));
                } else {
                    return window.localStorage.getItem(this.config.scope + '-' + config._name);
                }

            }
        } else {
            console.log("Por favor preencher o campo _name.")
        }
    }


    getLocalStorageScope(config) {
        if (config._name) {
            config._scope = config._scope == null ? this.config.localStorageEncrypt : config._scope;
            config._encrypt = config._encrypt == null ? this.config.localStorageEncrypt : config._encrypt;
            config._saveAsJSON = config._saveAsJSON == null ? this.config.saveAsJSON : config._saveAsJSON;

            if (config._encrypt == true) {
                if (config._saveAsJSON) {
                    return JSON.parse(this.decrypt(window.localStorage.getItem(config._scope + '-' + config._name)));
                } else {
                    return this.decrypt(window.localStorage.getItem(config._scope + '-' + config._name));
                }

            } else {
                if (config._saveAsJSON) {
                    return JSON.parse(window.localStorage.getItem(config._scope + '-' + config._name));
                } else {
                    return window.localStorage.getItem(config._scope + '-' + config._name);
                }

            }
        } else {
            console.log("Por favor preencher o campo _name.")
        }
    }

    //Matar todos itens do localSotage com o scopo 
    //definido no arquivo de configuração
    killLocalStorageMyScope() {
        var storages = [];
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes(this.config.scope)) {
                storages.push(localStorage.key(i));
            }
        }
        for (var i = 0; i < storages.length; i++) {
            window.localStorage.removeItem(storages[i])
        }

    }
    //Matar todos os itens que contains (name):string no localStorage
    killLocalStorageContainsScope(name) {
        var storages = [];
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes(name)) {
                storages.push(localStorage.key(i));
            }
        }
        for (var i = 0; i < storages.length; i++) {
            window.localStorage.removeItem(storages[i])
        }
    }




    //Funções privadas _ 
    _encryptUsingAES256(value, _saveAsJSON) {
        var data;
        if (_saveAsJSON == true) {
            data = JSON.stringify(value);
        } else if (_saveAsJSON == false) {
            data = value;
        }

        var _key = CryptoJS.enc.Utf8.parse(this.config.tokenFromUI);
        var _iv = CryptoJS.enc.Utf8.parse(this.config.tokenFromUI);
        var encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data), _key, {
                keySize: this.config.keySize,
                iv: _iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
        return encrypted.toString();
    }

    _decryptUsingAES256(valueCrypt, _saveAsJSON) {
        var decrypted;
        var _key = CryptoJS.enc.Utf8.parse(this.config.tokenFromUI);
        var _iv = CryptoJS.enc.Utf8.parse(this.config.tokenFromUI);

        decrypted = CryptoJS.AES.decrypt(
            valueCrypt, _key, {
                keySize: this.config.keySize,
                iv: _iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);

        if (_saveAsJSON == true) {
            return JSON.parse(JSON.parse(decrypted.toString()));

        } else if (_saveAsJSON == false) {
            console.log("Retorno STRING")
            return decrypted.toString();
        }
    }



}