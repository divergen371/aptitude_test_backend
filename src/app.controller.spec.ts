import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('calculateScore', () => {
    it('should return 100 when frontend answers are majority', () => {
      const answers = {
        q1: 'frontend',
        q2: 'frontend',
        q3: 'backend',
      };
      const result = appController.calculateScore(answers);
      expect(result.score).toBe(100);
    });

    it('should return 0 when backend answers are majority', () => {
      const answers = {
        q1: 'backend',
        q2: 'backend',
        q3: 'frontend',
      };
      const result = appController.calculateScore(answers);
      expect(result.score).toBe(0);
    });

    it('should return 50 when frontend and backend answers are equal', () => {
      const answers = {
        q1: 'frontend',
        q2: 'backend',
      };
      const result = appController.calculateScore(answers);
      expect(result.score).toBe(50);
    });
  });
});
