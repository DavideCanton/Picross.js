import { Injectable } from '@angular/core';
import { IEnvironment, EnvironmentEnum } from '../../js/utils';
import { environment } from '../../../environments/environment';


@Injectable()
export class EnvironmentService {
  env: IEnvironment;

  constructor() {
    this.env = environment;
  }

  get description(): string {
    switch (this.env.env) {
      case EnvironmentEnum.DEV: return 'Sviluppo';
      case EnvironmentEnum.PROD: return 'Produzione';
    }
  }
}
