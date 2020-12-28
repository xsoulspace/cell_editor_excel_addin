import { LangfullEntity } from './LangfullEntitiy'

export class Alert {
  constructor(
    public id: number = 0,
    public title: LangfullEntity = { rus: '', eng: '' }
  ) {}
}
