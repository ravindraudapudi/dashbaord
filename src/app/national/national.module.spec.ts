import { NationalModule } from './national.module';

describe('NationalModule', () => {
  let nationalModule: NationalModule;

  beforeEach(() => {
    nationalModule = new NationalModule();
  });

  it('should create an instance', () => {
    expect(nationalModule).toBeTruthy();
  });
});
