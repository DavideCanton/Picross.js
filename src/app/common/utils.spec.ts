import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../app.module';
import { PicrossTable } from './utils';

describe('PicrossTable', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create a random table', () => {
        const table = PicrossTable.randomTable(5, 5, 0.9);

        expect(table.r).toBe(5);
        expect(table.c).toBe(5);
  });
});
