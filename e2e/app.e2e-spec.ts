import { ScgasAdmPage } from './app.po';

describe('scgas-adm App', function() {
  let page: ScgasAdmPage;

  beforeEach(() => {
    page = new ScgasAdmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
