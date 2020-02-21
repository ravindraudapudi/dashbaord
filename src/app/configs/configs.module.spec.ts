import { ConfigsModule } from './configs.module';

describe('ConfigsModule', () => {
  let configsModule: ConfigsModule;

  beforeEach(() => {
    configsModule = new ConfigsModule();
  });

  it('should create an instance', () => {
    expect(configsModule).toBeTruthy();
  });
});
