import { EmRouterModule } from './em-router.module';

describe('EmRouterModule', () => {
  let emRouterModule: EmRouterModule;

  beforeEach(() => {
    emRouterModule = new EmRouterModule();
  });

  it('should create an instance', () => {
    expect(emRouterModule).toBeTruthy();
  });
});
