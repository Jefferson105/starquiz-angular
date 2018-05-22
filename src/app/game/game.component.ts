import { Component, OnInit, ViewChild } from '@angular/core';

import { Char } from "../char";
import { CardsService } from "../cards.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    name: string;
    email: string;
    erroMsg: string;

    points: number = 0;
    allChars: Char[];
    chars: Char[];
    chars1: Char[];  
    finished: boolean = false;
    time: string;
    slide: number = 0;
    totalTime: number = 120;

    showDetails: boolean = false;
    detail: any = null;

    @ViewChild('inputName') inputName;
    @ViewChild('list1') list1;
    @ViewChild('inputEmail') inputEmail;
    @ViewChild('inputUser') inputUser;

    constructor(private cardsService: CardsService) { }

    ngOnInit() {
        this.getChars();
        this.cownDown();
        this.infoStorage();
    }

    infoStorage() {
        if(localStorage.getItem("userInfo") != undefined) {
            var { email, user } = JSON.parse(localStorage.getItem("userInfo"));
            this.name = user;
            this.email = email;
        }
    }

    async savePontuation() {
        var email = this.inputEmail.nativeElement;
        var user = this.inputUser.nativeElement;
        if(email.checkValidity() && user.checkValidity()) {
            try {

                // Stringify data posted by user
                var data = JSON.stringify({
                    user: user.value,
                    email: email.value,
                    pontuation: this.points
                });

                // Fetch options
                var options = {
                    method: "POST",
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: data
                }

                // Save in local stora
                localStorage.setItem("userInfo", data);

                // Send data to api
                var res = await fetch("http://localhost:8000/api/save", options);
                var { success, error } = await res.json();

                if(success) 
                    window.location.href = "/score";
                else 
                    this.erroMsg = "An error has ocurred. Try again.";
                     
            }catch(err) {
                console.error(err);
                this.erroMsg = "An error has ocurred. Try again.";    
            }
        }else {
            this.erroMsg = "Fill the fields correctly";
        }
    }

    getChars() {
        let chars = this.cardsService.getChars();
        this.allChars = chars;
        this.chars = chars.slice(0, Math.round(chars.length / 2));
        this.chars1 = chars.slice(-Math.round(chars.length / 2));
    }

    showDetail(id: number) {
        this.detail = this.allChars[id];
        this.allChars[id].points = 5;
        this.showDetails = true;
    }

    closeDetail() {
        this.showDetails = false;
    }

    cownDown() {
        const paddingZero = (num) => (String(num).length > 1) ? num : "0" + num;
        
        const formatTime = (sec) => {
            var minutes = Math.floor(sec / 60);
            var seconds = Math.abs((minutes * 60) - sec);
            return paddingZero(minutes) + ":" + paddingZero(seconds);
        }

        var currentTime = this.totalTime;
        var timeInterval = setInterval(() => {
            currentTime -= 1; 
            this.time = formatTime(currentTime);

            // When time reach 0 clearinterval
            if(!currentTime) {
                clearInterval(timeInterval);
                this.finished = true;
            }
        }, 1000);
    }

    showHideInput(val: boolean, id: number) {
        this.allChars[id].showInput = val;
    }

    checkName(val: string, id: number) {
        if(val.toLowerCase() == this.allChars[id].name.toLowerCase()) {
            this.points += this.allChars[id].points;
            this.allChars[id].correct = 1;
        }else {
            this.allChars[id].correct = 0;
        }
    }

    sendName(id: number) {
        var name = this.inputName.nativeElement.value;

        if(name)
            this.checkName(name, id);
    }

    keyInput(e: any, id: number) {
        if(e.keyCode == 13 && e.target.value) {
            this.checkName(e.target.value, id);
        }
    }

    slideRight() {
        var parentWidth = this.list1.nativeElement.parentElement.offsetWidth;
        var listWidth = this.list1.nativeElement.scrollWidth;
        var widthTranslated = parentWidth * this.slide + parentWidth;

        if(widthTranslated > listWidth)
            return;
        else 
            this.slide++;
    }

    slideLeft() {
        if(this.slide > 0) {
            this.slide--;
        }
    }
}
