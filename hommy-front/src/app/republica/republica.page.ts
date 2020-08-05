import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from './../services/comment.service';

@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {

  username = localStorage.getItem('username');
  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;
  
  //republic: number = JSON.parse(localStorage.getItem('republica'));
  //republic_id = this.republic.id;
  
  
  comments = [];

  constructor( public formbuilder: FormBuilder, public commentService: CommentService ) { 

    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });

  }

  ngOnInit() {

    //console.log(this.republic_id);

    this.comments = [{
      id: 1,
      username: 'Kujo Jotaro',
      text: 'Oraoraoraoraoraoraororaoraoraoraoroaroarraoao!'
    },
    {
      id: 2,
      username: 'Josuke Higashikata',
      text: 'Dorarararararararararararara!'
    },
    {
      id: 3,
      username: 'Joseph Joestar',
      text: 'Oh my god!!!'
    },
    {
      id: 4,
      username: 'Giorno Giovanna',
      text: 'Mudamudamudamudamudamudamuda!'
    }];
  }

  sendComment(form){
    console.log(form);
    console.log(form.value);
    this.editMode = false;
    form.value.username = this.username;
    this.commentService.createComment(form.value).subscribe(
      (res) => {
        alert(res);
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
  }

  sendEditComment(form){
    console.log(form);
    console.log(form.value);
    //form.value.republic_id = this.republic_id;
    //form.value.username = this.username;
  }

  toggleEdit(id){
    this.editMode = true;
    console.log(id)
  }

  deleteComment(id){
    console.log('Mais que cancelado: ' + id);
  }

}
