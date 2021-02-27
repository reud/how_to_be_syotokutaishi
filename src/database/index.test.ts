import {} from './index';
import { CreateLocalRepository } from './local-database';

describe('問題の取得テスト', () => {
  test('', async () => {
    const rep = CreateLocalRepository();
    let f = await rep.insertUserData('hoge');
    console.log(f);
    f = await rep.updateUserData('hoge', 800);
    console.log(f);
  });
});
