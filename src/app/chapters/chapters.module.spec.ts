import { ChaptersModule } from './chapters.module';

describe('ChapterModule', () => {
  let chapterModule: ChaptersModule;

  beforeEach(() => {
    chapterModule = new ChaptersModule();
  });

  it('should create an instance', () => {
    expect(chapterModule).toBeTruthy();
  });
});
