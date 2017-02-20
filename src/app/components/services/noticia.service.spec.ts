/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoticiaService } from './noticia.service';

describe('NoticiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoticiaService]
    });
  });

  it('should ...', inject([NoticiaService], (service: NoticiaService) => {
    expect(service).toBeTruthy();
  }));
});
