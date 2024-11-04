import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  diceValues = [1, 1, 1, 1, 1];
  isLocked = [false, false, false, false, false];
  rollCount = 0;

  objectives = {
    threeOfAKind: false,
    fourOfAKind: false,
    yahtzee: false
  };

  score = {
    threeOfAKind: 0,
    fourOfAKind: 0,
    yahtzee: 0
  };

  get totalScore() {
    return this.score.threeOfAKind + this.score.fourOfAKind + this.score.yahtzee;
  }

  rollAllDice() {
    if (this.rollCount < 3) {
      this.diceValues = this.diceValues.map((value, index) =>
        this.isLocked[index] ? value : Math.floor(Math.random() * 6) + 1
      );
      this.rollCount++;
      this.checkObjectives();
    }
  }

  toggleLock(index: number) {
    if (this.rollCount > 0) {
      this.isLocked[index] = !this.isLocked[index];
    }
  }

  resetGame() {
    this.diceValues = [1, 1, 1, 1, 1];
    this.isLocked = [false, false, false, false, false];
    this.rollCount = 0;
    this.objectives = { threeOfAKind: false, fourOfAKind: false, yahtzee: false };
    this.score = { threeOfAKind: 0, fourOfAKind: 0, yahtzee: 0 };
  }

  checkObjectives() {
    const count = this.diceValues.reduce((acc, value) => {
      acc[value - 1]++;
      return acc;
    }, [0, 0, 0, 0, 0, 0]);

    this.objectives.threeOfAKind = count.some(c => c >= 3);
    this.objectives.fourOfAKind = count.some(c => c >= 4);
    this.objectives.yahtzee = count.some(c => c === 5);

    if (this.objectives.threeOfAKind) this.score.threeOfAKind = 10;
    if (this.objectives.fourOfAKind) this.score.fourOfAKind = 20;
    if (this.objectives.yahtzee) this.score.yahtzee = 50;
  }
}
