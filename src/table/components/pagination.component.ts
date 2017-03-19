import { Component, OnChanges, Input, Output, ElementRef, EventEmitter, Renderer} from '@angular/core';

@Component({
    selector: 'my-pagination',
    template: `
       <ul class="pagination">

        <li *ngIf="boundaryLinks" [class.disabled]="currentPage === 1">
          <a class="page-link" href (click)="selectPage(1, $event)">First</a>
        </li>

        <li *ngIf="directionLinks" [class.disabled]="currentPage === 1">
          <a class="page-link" href (click)="selectPage(currentPage - 1, $event)">Previous</a>
        </li>

        <li *ngFor="let page of pages">
          <a class="page-link" [class.active]="currentPage === page" href (click)="selectPage(page, $event)">{{page}}</a>
        </li>

        <li class="pagination-next" *ngIf="directionLinks" [class.disabled]="currentPage === totalPages">
          <a class="page-link" href (click)="selectPage(currentPage + 1, $event)">Next</a></li>

        <li *ngIf="boundaryLinks" [class.disabled]="currentPage === totalPages">
          <a class="page-link" href (click)="selectPage(totalPages, $event)">Last</a>
        </li>
        <li> 
            Items per page
            <select (change)="pageSizeChanged(select.value)" #select [value]="pageSize">
                <option *ngFor="let option of [1,2,3,5,10]" [value]="option">{{option}}</option>
            </select>
        </li>
        <li class="pagination-current-page">
            Page {{ currentPage }} of {{ total }}
        </li>
      </ul>
    
    `
})
export class PaginationComponent implements OnChanges {

    @Input() pageSize: number;

    @Input() total: number;

    @Input() maxSize:number = 3;

    @Input() boundaryLinks:boolean = true;

    @Input() directionLinks:boolean = true;

    @Output() currentPageChange:EventEmitter<number> = new EventEmitter();

    @Output() pageSizeChange:EventEmitter<number> = new EventEmitter();
   
    @Input()
    public set currentPage(value) {
        const _previous = this._currentPage;
        this._currentPage = (value > this.totalPages) ? this.totalPages : (value || 1);

        if (_previous === this._currentPage || typeof _previous === 'undefined') {
            return;
        }

        this.currentPageChange.emit(this._currentPage);
    }

    public get currentPage() {
        return this._currentPage;
    }

    totalPages: number;

    pages: Array<any>;

    private _currentPage:number;

    constructor(public renderer: Renderer, public elementRef: ElementRef) { }

    ngOnChanges() {
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.totalPages);
    }

    pageSizeChanged(val) {
        this.pageSizeChange.emit(val);   
    }

    private selectPage(page:number, event?:MouseEvent) {
        if (event) {
            event.preventDefault();
        }
 
       this.currentPage = page;
       this.pages = this.getPages(this.totalPages);
    }

    private getPages(totalPages:number):Array<any> {
        let pages:any[] = [];

        let startPage = 1;
        let endPage = totalPages;
        let isMaxSized = this.maxSize && this.maxSize < totalPages;

        if (isMaxSized) {  
            startPage = Math.max(this.currentPage - Math.floor(this.maxSize / 2), 1);
            endPage = startPage + this.maxSize - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - this.maxSize + 1;
            }
        }

        for (var number = startPage; number <= endPage; number++) {
            pages.push(number);
        }

        return pages;
    }

    private calculateTotalPages():number {
        let totalPages = this.pageSize < 1 ? 1 : Math.ceil(this.total / this.pageSize);
        return Math.max(totalPages || 0, 1);
    }

}
