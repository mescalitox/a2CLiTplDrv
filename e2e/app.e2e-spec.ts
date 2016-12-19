import { A2CliTplDrvPage } from './app.po';

describe('a2-cli-tpl-drv App', function() {
  let page: A2CliTplDrvPage;

  beforeEach(() => {
    page = new A2CliTplDrvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
