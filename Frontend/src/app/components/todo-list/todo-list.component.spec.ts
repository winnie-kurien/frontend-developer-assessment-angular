import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ TodoListComponent ],
      providers: [{ provide: TodoService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the todoList property', () => {
    component.getAllTodoList();
    expect(component.todoList).toBeGreaterThanOrEqual(0);
  });

  it('should mark a todo as completed', (done) => {
    component.getAllTodoList();
    setTimeout(() => {
      // console.log(component.todoList);
      const todo = component.todoList[0];
      // console.log(todo);
      if (todo) {
        component.updateTodo(todo);
        setTimeout(() => {
          expect(todo.isCompleted).toBe(true);
          done();
        }, 1000);
      } else {
        // console.log('Todo not found');
        done();
      }
    }, 1000);
  });
});
