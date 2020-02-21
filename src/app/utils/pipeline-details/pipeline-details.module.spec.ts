import { PipelineDetailsModule } from './pipeline-details.module';

describe('PipelineDetailsModule', () => {
  let pipelineDetailsModule: PipelineDetailsModule;

  beforeEach(() => {
    pipelineDetailsModule = new PipelineDetailsModule();
  });

  it('should create an instance', () => {
    expect(pipelineDetailsModule).toBeTruthy();
  });
});
