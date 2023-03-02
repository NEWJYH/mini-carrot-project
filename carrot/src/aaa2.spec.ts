import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('return Hello World!', () => {
      const result = appController.getHello();
      console.log(result);
      expect(result).toBe('Hello World!');
    });
  });
});
