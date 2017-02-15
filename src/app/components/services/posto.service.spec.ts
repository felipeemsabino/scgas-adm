/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostoService } from './posto.service';

describe('PostoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostoService]
    });
  });

  it('should ...', inject([PostoService], (service: PostoService) => {
    expect(service).toBeTruthy();
  }));
});
