import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/services/todo.model';
import { TodoService } from 'src/app/services/todo.service';

interface ValidationErrors {
  invalidPattern: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public description: FormControl = new FormControl(null, [Validators.required]);
  public todoList: Todo[] = [];

  public constructor(private todoService: TodoService) {}

  public ngOnInit(): void {
    this.getAllTodoList();
    this.description.valueChanges.subscribe(value => {
      if (value) {
        if (value.includes("cat") || value.includes("dog") || value.includes("yes") || value.includes("no"))
        this.description.setValidators(f => <ValidationErrors>{ invalidPattern: true });
        else 
          this.description.setValidators(Validators.required);
      } else { this.description.clearValidators(); }
      // this.description.updateValueAndValidity();
    })
  }

  public getAllTodoList(): void {
    this.todoService.getAllTodoList().subscribe((response: Todo[]) => {
      this.todoList = response.sort((a,b) => a.description.localeCompare(b.description));
    })
  }

  public createTodo(): void {
    if (this.description.valid) {
      const requestObj = {
        "description": this.description.value,
        "isCompleted": false
      }
      this.todoService.addTodoData(requestObj).subscribe((response: Todo) => {
        this.clearInput();
        this.todoList.push(response);
        this.todoList = this.todoList.sort((a,b) => a.description.localeCompare(b.description));
      })
    }
  }

  public clearInput(): void {
    this.description.setValue(null);
    this.description.clearValidators();
    this.description.updateValueAndValidity();
  }

  public deleteTodo(id: string): void {
    if (id != "") {
      this.todoService.deleteSingleTodoData(id).subscribe((response) => {
        if(response == null) this.getAllTodoList();
      })
    }
  }

  public updateTodo(todo: Todo): void {
    if (todo) {
      const todoObj = {
        "description": todo.description,
        "isCompleted": todo.isCompleted == false ? true : false
      }
      // console.log('todoObj:', todoObj);
      this.todoService.updateSingleTodoData(todo.id, todoObj).subscribe((response) => {
        // console.log('response:', response);
        if(typeof response === "object") this.getAllTodoList();
      })
    }
  }  
}
