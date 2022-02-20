import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'arv-lab';

  list: Todo[] = [];
  isEditMode: boolean = false;
  editIndex: number = -1;
  addInputData: string = '';
  editInputData: string = '';
  displayMode: '' | 'todo' = '';

  get filteredList(): Todo[] {
    return this.displayMode === 'todo'
      ? this.list.filter(({ isDone }) => !isDone)
      : this.list;
  }

  constructor(private appService: AppService) {}

  trackByID = (index: number, item: Todo) => item.id;

  ngOnInit(): void {
    this.loadData();
  }

  onKeyupAddInputHandler(e: KeyboardEvent) {
    if (e.code === 'Enter' && this.addInputData.length > 0) {
      this.appService
        .add(this.addInputData)
        .pipe(switchMap(() => this.appService.getAll()))
        .subscribe((data) => {
          this.addInputData = '';
          this.list = data;
        });
    }
  }

  onClickAppHandler() {
    if (this.isEditMode) {
      this.clearEditMode();
    }
  }

  onClickedItemHandler(index: number, e: MouseEvent) {
    e.stopPropagation();
    this.isEditMode = true;
    this.editIndex = index;
    this.editInputData = this.list[index].text;
    setTimeout(() => {
      document.getElementsByName('edit-input')[0].focus();
    }, 100);
  }

  onKeyupEditInputHandler(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.clearEditMode();
    }
    if (e.code === 'Enter' && this.editInputData.length > 0) {
      const editData = this.list[this.editIndex];
      this.isEditMode = false;
      this.editIndex = -1;
      this.appService
        .update(editData.id, this.editInputData)
        .pipe(switchMap(() => this.appService.getAll()))
        .subscribe((data) => {
          this.editInputData = '';
          this.list = data;
        });
    }
  }

  onClickChangeStatusHandler(todo: Todo) {
    const newStatus = todo.isDone ? 'todo' : 'done';
    this.appService
      .changeStatus(todo.id, newStatus)
      .pipe(switchMap(() => this.appService.getAll()))
      .subscribe((data) => (this.list = data));
  }

  onClickDeleteHandler(todo: Todo) {
    this.appService
      .delete(todo.id)
      .pipe(switchMap(() => this.appService.getAll()))
      .subscribe((data) => (this.list = data));
  }

  onToggleDisplayModeHandler() {
    if (this.displayMode === '') {
      this.displayMode = 'todo';
    } else {
      this.displayMode = '';
    }
  }

  onClickDeleteDoneHandler() {
    this.appService
      .deleteDone()
      .pipe(switchMap(() => this.appService.getAll()))
      .subscribe((data) => (this.list = data));
  }

  onClickDeleteAllHandler() {
    this.appService
      .deleteAll()
      .pipe(switchMap(() => this.appService.getAll()))
      .subscribe((data) => (this.list = data));
  }

  private loadData() {
    this.appService.getAll().subscribe((data) => {
      this.list = data;
    });
  }

  private clearEditMode() {
    this.isEditMode = false;
    this.editIndex = -1;
    this.editInputData = '';
  }
}
