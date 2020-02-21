import { UsersMgmtModule } from './users-mgmt.module';

describe('UsersMgmtModule', () => {
  let usersMgmtModule: UsersMgmtModule;

  beforeEach(() => {
    usersMgmtModule = new UsersMgmtModule();
  });

  it('should create an instance', () => {
    expect(usersMgmtModule).toBeTruthy();
  });
});
