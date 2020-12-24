export class Sheet {
  constructor(
    public id: number = 0,
    public name: string = '',
    public visibility: Maybe<Excel.SheetVisibility> = null,
    public position: number
  ) {}
}
