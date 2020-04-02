import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

@Injectable()
export class EnvironmentService
{
    get description(): string
    {
        return environment.production ? 'Produzione' : 'Sviluppo';
    }
}
