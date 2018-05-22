import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    scores = [];

    constructor() { }

    ngOnInit() {
        this.getScores();
    }

    async getScores() {
        const res = await fetch("http://localhost:8000/api/list");
        const { list } = await res.json();

        this.scores = list;
    }

}
