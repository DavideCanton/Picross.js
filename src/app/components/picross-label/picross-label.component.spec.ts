import { TestBed, async } from '@angular/core/testing';
import { PicrossLabelComponent } from './picross-label.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../../app.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PicrossLabelComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
