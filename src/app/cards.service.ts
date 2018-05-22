const replaceSpecialChars = function(str) {
    str = str.replace(/[ÀÁÃÄÂ]/g,"A");
    str = str.replace(/[àáãâä]/g,"a");
    str = str.replace(/[ÈÉÊË]/g,"E");
    str = str.replace(/[èéêë]/g,"e");
    str = str.replace(/[ÌÍÎÏ]/g,"I");
    str = str.replace(/[ìíîï]/g,"i");
    str = str.replace(/[ÒÓÔÕÖ]/g,"O");
    str = str.replace(/[òóôõö]/g,"o");
    str = str.replace(/[ÙÚÛŨÜ]/g,"U");
    str = str.replace(/[ùúûũü]/g,"u");
    str = str.replace(/[Ç]/g,"C");
    str = str.replace(/[ç]/g,"c");

    return str;
};

const charCodePlus = function(str) {
    var str = str.split("");
    return str.map((l) => String.fromCharCode(l.charCodeAt(0) + 1)).join("");
};

import { Injectable } from '@angular/core';

import { Char } from "./char";
import * as AllChars from "./allChars.json";

@Injectable({
  providedIn: 'root'
})

export class CardsService {
    constructor() { }

    getChars() {
        var Chars = Object.keys(AllChars).map((c, i) => 
            AllChars[c].name ? 
                Object.assign(
                    AllChars[c], 
                    { 
                        photo: `assets/img/chars/${replaceSpecialChars(charCodePlus(AllChars[c].name.split(" ")[0]))}.jpeg`,
                        id: i,
                        showInput: false,
                        correct: 2,
                        points: 10
                    }
                ) : "");
                
        return Chars;
    }
}
