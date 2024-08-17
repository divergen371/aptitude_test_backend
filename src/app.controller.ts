import { Body, Controller, Post } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Post('calculate')
  calculateScore(@Body() answers: Record<string, string>) {
    let score = 0;
    let frontendCount = 0;
    let backendCount = 0;

    for (const key in answers) {
      if (answers[key] === 'frontend') {
        frontendCount += 1;
      } else if (answers[key] === 'backend') {
        backendCount += 1;
      }
    }

    // フロントエンドとバックエンドの回答数を比較して適性を判定
    if (frontendCount > backendCount) {
      score = 100; // フロントエンドに適性がある場合
    } else if (backendCount > frontendCount) {
      score = 0; // バックエンドに適性がある場合
    } else {
      score = 50; // 同数の場合（どちらも適性がある）
    }

    return { score };
  }
}
