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

  commentId: number;
  
  republic = JSON.parse(localStorage.getItem('republica'));
  
  
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

    this.republicWithComments();

  }

  sendComment(form){
    console.log(form);
    console.log(form.value);
    form.value.username = this.username;
    form.value.republic_id = this.republic.id;
    this.commentService.createComment(form.value).subscribe(
      (res) => {
        console.log(res);
        this.republicWithComments();
      }, (err) => {
        console.log(err);
      }
    );
  }

  republicWithComments(){
    this.commentService.showRepublicWithComments(this.republic.id).subscribe(
      (res) => {
        console.log(res);
        this.comments = res.comments;
      }, (err) => {
        console.log(err);
      }
    );

  }


  sendEditComment(form){
    console.log(form);
    console.log(form.value);
    this.commentService.updateComment(form.value, this.commentId).subscribe(
      (res) => {
        this.editMode = false;
        console.log(res);
        this.republicWithComments();
      }, (err) => {
        console.log(err);
      }
    );
  }

  toggleEdit(id){
    this.commentId = id;
    this.editMode = true;
    console.log(this.commentId);
  }

  deleteComment(id){
    console.log('Mais que cancelado: ' + id);
    this.commentService.deleteComment(id).subscribe(
      (res) => {
        console.log(res);
        this.republicWithComments();
      }, (err) => {
        console.log(err.error);
      }
    );
  }
}
