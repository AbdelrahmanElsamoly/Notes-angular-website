import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthenService } from '../authen.service';
import { UserNotesService } from '../user-notes.service';
declare var particlesJS: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HOMEComponent implements OnInit {
  userNotes: any;
  id: any;
  token: any;
  decoded: any;
  data: any;
  NoteInfo: any;
  UpDatedNote: any;
  Id: any;
  Noteids: any;

  addNote = new FormGroup({
    title: new FormControl('', [Validators.required]),
    Note: new FormControl('', [Validators.required]),
  });
  SelNote = new FormGroup({
    title: new FormControl('', [Validators.required]),
    Note: new FormControl('', [Validators.required]),
  });

  constructor(
    public _userNote: UserNotesService,
    public _authen: AuthenService,
    public _router: Router
  ) {
    try {
      this.id = this._authen.user.getValue();
      this.token = localStorage.getItem('userData');
      this.decoded = this.id._id;
    } catch (error) {
      localStorage.clear();
      this._router.navigate(['/login']);
    }

    this.id = this._authen.user.getValue();
    this.token = localStorage.getItem('userData');
    this.decoded = this.id._id;
    this.data = {
      token: this.token,
      userID: this.decoded,
    };

    this.getNotes(this.data);
  }

  getNotes(info: any): void {
    this._userNote.getUserNotes(info).subscribe((response) => {
      if (response.message == 'success') {
        this.userNotes = response.Notes;
      }
    });
  }

  addNotes() {
    this.id = this._authen.user.getValue();
    this.token = localStorage.getItem('userData');
    this.decoded = this.id._id;
    this.data = {
      token: this.token,
      userID: this.decoded,
    };
    let addNewnot = {
      token: this.token,
      citizenID: this.id._id,
      title: this.addNote.value.title,
      desc: this.addNote.value.Note,
    };
    this._userNote.editNotes(addNewnot).subscribe((res) => {
      if (res.message == 'success') {
        $('#Addnote').modal('hide');
        this.getNotes(this.data);
        this.addNote.reset();
      }
    });
  }
  // delete Note
  noteID(id: any): void {
    this.Noteids = id;
    this.NoteInfo = {
      NoteID: this.Noteids,
      token: this.token,
    };
    console.log(id);
  }
  DeleteNoteSele() {
    console.log(this.NoteInfo);
    this._userNote.deleteNote(this.NoteInfo).subscribe((response) => {
      console.log(response);
      $('#DeleteNote').modal('hide');

      this.getNotes(this.data);
    });
  }
  // edit note
  getselectNot(sNote: any) {
    console.log(sNote);
    this.SelNote.controls.title.setValue(sNote.title);
    this.SelNote.controls.Note.setValue(sNote.desc);
    console.log(this.token);

    this.UpDatedNote = {
      token: this.token,
      desc: sNote.desc,
      title: sNote.title,
      NoteID: sNote._id,
    };
  }
  UpDated() {
    this.UpDatedNote = {
      token: this.token,
      desc: this.SelNote.value.Note,
      title: this.SelNote.value.title,
      NoteID: this.Noteids,
    };
    this._userNote.upDateNote(this.UpDatedNote).subscribe((response) => {
      if ((response.message = 'updated')) {
        console.log(response);
        this.id = this._authen.user.getValue();
        this.token = localStorage.getItem('userData');
        this.decoded = this.id._id;
        this.data = {
          token: this.token,
          userID: this.decoded,
        };
        $('#EditNote').modal('hide');
        this.getNotes(this.data);
      }
    });
  }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particles.json', function () {});
  }
}
