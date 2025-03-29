import { Component } from "./Component";

export class MovementComponent implements Component {
    name = 'movement';
    speed: number;

    constructor(speed: number) {
      this.speed = speed;
    }
}