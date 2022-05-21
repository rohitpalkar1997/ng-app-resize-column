import { Directive, OnInit, Renderer2, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[resizeColumn]"
})
export class ResizeColumnDirective implements OnInit {
  @Input("resizeColumn") resizable?: boolean;

  @Input() index?: number;

  private _startX?: number;

  private _startWidth?: number;

  private _column?: HTMLElement;

  private _table?: HTMLElement;

  private _pressed?: boolean;

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
    this._column = this._elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.resizable) {
      const row = this._renderer2.parentNode(this._column);
      const thead = this._renderer2.parentNode(row);
      this._table = this._renderer2.parentNode(thead);

      const resizer = this._renderer2.createElement("span");
      this._renderer2.addClass(resizer, "resize-holder");
      this._renderer2.appendChild(this._column, resizer);
      this._renderer2.listen(resizer, "mousedown", this.onMouseDown);
      this._renderer2.listen(this._table, "mousemove", this.onMouseMove);
      this._renderer2.listen("document", "mouseup", this.onMouseUp);
    }
  }

  onMouseDown = (event: MouseEvent) => {
    console.info(`onMouseDown called.`);
    this._pressed = true;
    this._startX = event.pageX;
    this._startWidth = this._column?.offsetWidth;
  };

  onMouseMove = (event: MouseEvent) => {
    console.info(`onMouseMove called.`);
    const offset = 35;
    if (this._pressed && event.buttons) {
      console.info(`addClass resizing.`);
      this._renderer2.addClass(this._table, "resizing"); // Adding class `resizing` to keep showing the `resize-holder` while moving the column.

      // Calculate width of column.
      let width = this._startWidth! + (event.pageX - this._startX! - offset);
      console.info(`column's width is: ${width}px`);

      const tableCells = Array.from(this._table!.querySelectorAll(".mat-row")).map(
        (row: any) => row.querySelectorAll(".mat-cell").item(this.index)
      );
      console.info(`tableCells.length is: ${tableCells.length}`);

      // Set table header width.
      this._renderer2.setStyle(this._column, "width", `${width}px`);

      // Set table cells width.
      for (const cell of tableCells) {
        this._renderer2.setStyle(cell, "width", `${width}px`);
      }
    }
  };

  onMouseUp = (event: MouseEvent) => {
    console.info(`onMouseUp called.`);
    if (this._pressed) {
      this._pressed = false;
      this._renderer2.removeClass(this._table, "resizing");
    }
  };
}
