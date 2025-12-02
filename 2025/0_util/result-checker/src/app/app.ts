import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Handlers} from './handlers/handlers';
import {HandlerWithId} from '../services/result-server-service';
import {Field, form} from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Handlers, Field],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  readonly httpClient = inject(HttpClient);
  protected readonly response = signal<string | undefined>(undefined);
  readonly selectedHandler = signal<HandlerWithId | undefined>(undefined);
  readonly formModel = signal<{ input: string }>({
    input: '',
  });
  readonly inputForm = form(this.formModel);
  readonly onSubmit = () => {
    const handler = this.selectedHandler();
    if(!handler){
      throw "No Handler";
    }
    this.httpClient
      .post(handler.url, this.inputForm.input().value()).subscribe(response => this.response.set(JSON.stringify(response)))
  }
}
