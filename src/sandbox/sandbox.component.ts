import { Component, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <h3>Child</h3>
    
  `
})
export class ChildComponent {
  @Input() prop: number;





  ngOnInit() {
    console.log(typeof this.prop);
  }
}

@Component({
  selector: 'my-sandbox',
  template: `
    <h2>Sandbox</h2>
    <child prop="{{x}}"></child>
  `
})
export class SandBoxComponent {
  x = 5;
}