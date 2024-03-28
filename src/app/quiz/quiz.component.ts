import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title: string = "";

  questions:any ;
  questionsSelected:any;

  answers:string[] = [];
  answerSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;
  finalResult:string = '';
  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
  
      this.questions = quizz_questions.questions;
      this.questionsSelected = this.questions[this.questionIndex];
      
      this.questionIndex = 0; /*check later if this line can be deleted */
      this.questionMaxIndex = this.questions.length;

      this.finalResult = '';
    }
  }

  storeChosenOption(value:string){
    this.answers.push(value);
    this.displayNextQuestionOrResults();
    /*console.log(this.answers)*/
  }

  displayNextQuestionOrResults(){
    this.questionIndex = this.questionIndex + 1;

    if (this.questionIndex < this.questionMaxIndex) {
      this.questionsSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      //verificar opção ganhadora
      this.checkResult(this.answers);
    }
  }

  async checkResult(answers:string []){
    let result_A:number = 0;
    let result_B:number = 0;
    for (let index = 0; index < answers.length; index++) {
      if (answers[index] === 'A') {
        result_A = result_A + 1;
      }
      else {
        result_B = result_B + 1;
      }      
    }

    if (result_A > result_B) {
      this.finalResult = quizz_questions.results['A'];

    } else {
      this.finalResult = quizz_questions.results['B'];
    }

    console.log(this.finalResult) /**Não exibe valor algum */
  }
  
}
