import { Directive, Input, ElementRef, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { DragulaService } from './dragula.service';
import * as dragula from 'dragula';

@Directive({selector: '[dragula]'})
export class DragulaDirective implements OnInit, OnChanges {
    @Input() public dragula: string;
    @Input() public dragulaModel: any;
    @Input() public dragulaOptions: any;
    private container: any;
    private drake: any;

    public constructor(el: ElementRef, private dragulaService: DragulaService) {
        this.dragulaService = dragulaService;
        this.container = el.nativeElement;
    }

    public ngOnInit(): void {
        let bag = this.dragulaService.find(this.dragula);
        if (bag) {
            this.drake = bag.drake;
            this.checkModel();
            this.drake.containers.push(this.container);
        } else {
            this.drake = dragula([this.container], Object.assign({}, this.dragulaOptions));
            this.checkModel();
            this.dragulaService.add(this.dragula, this.drake);
        }
    }

    private checkModel() {
        if (!this.dragulaModel) {
            return;
        }

        if (this.drake.models) {
            this.drake.models.push(this.dragulaModel);
        } else {
            this.drake.models = [this.dragulaModel];
        }
    }

    public ngOnChanges(changes: {dragulaModel?: SimpleChange}): void {
        if (this.drake && changes && changes.dragulaModel) {
            if (this.drake.models) {
                let modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
            } else {
                this.drake.models = [changes.dragulaModel.currentValue];
            }
        }
    }
}
