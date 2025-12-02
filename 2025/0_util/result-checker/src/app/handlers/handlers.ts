import {Component, effect, inject, input, output, resource} from '@angular/core';
import {Handler, HandlerWithId, ResultServerService} from '../../services/result-server-service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-handlers',
  imports: [],
  templateUrl: './handlers.html',
  styleUrl: './handlers.css',
  standalone: true
})
export class Handlers {
  private readonly resultServerService = inject(ResultServerService);
  readonly handlersResource = rxResource<HandlerWithId[], any>({
    // Define a reactive computation.
    // The params value recomputes whenever any read signals change.
    params: () => 'onetime',
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `params` value changes.
    stream: () => this.resultServerService.getHandlers(),
  });
  readonly handlerSelected = output<HandlerWithId>();
  readonly selectedHandlerId = input<string | null>(null);
  constructor() {
    effect(() => {
      if(!this.handlersResource.hasValue() || this.selectedHandlerId() !== null) {
        return;
      }
      this.handlerSelected.emit(this.handlersResource.value()[0]);
    });
  }
}
