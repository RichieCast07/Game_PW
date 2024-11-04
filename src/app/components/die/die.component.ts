import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent {
  @Input() value: number = 1;

  rollDie() {
    this.value = Math.floor(Math.random() * 6) + 1;
  }
}
