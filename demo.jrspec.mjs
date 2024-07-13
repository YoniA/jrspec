import {jrspec, expect} from './jrspec.mjs';

//========== Usage example


class Bowling {
  constructor() {
    this.score = 0;
  }

  hit(pinCount) {
    this.score += pinCount;
  }
}


jrspec.describe("Bowling", () => {
  jrspec.it("starts a new game with score of 0", () => {
    const bowling = new Bowling();
    return expect(bowling.score).to_eq(0);
  });
  

  jrspec.it("sums the pin count for each roll", () => {
    const bowling = new Bowling();
    for(let i=0; i<20; i++) {
      bowling.hit(4); 
    }
    return expect(bowling.score).to_eq(80);
  });
  
  jrspec.it("starts a new game with a roll count of 0", () => {
    const bowling = new Bowling();
    return expect(bowling.rollCount).to_eq(0);
  });
});

