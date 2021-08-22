export class Score {
    value?: string;
    viewValue?: string;
  }
  
export class ScoreModule {
    score: Array<Score>

    constructor(){
        this.score = new Array<Score>()
    }
}
  