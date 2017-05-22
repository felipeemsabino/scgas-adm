/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParametrosgeraisService } from './parametrosgerais.service';

describe('ParametrosgeraisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametrosgeraisService]
    });
  });

  it('should ...', inject([ParametrosgeraisService], (service: ParametrosgeraisService) => {
    expect(service).toBeTruthy();
  }));
});
