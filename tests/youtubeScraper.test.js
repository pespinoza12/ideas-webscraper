const puppeteer = require('puppeteer');
const { buscarVideos } = require('../youtubeScraper');

describe('buscarVideos', () => {
  it('retorna array com o tamanho esperado', async () => {
    const mockVideos = [{}, {}];
    const mockEvaluate = jest.fn().mockResolvedValue(mockVideos);
    const mockPage = {
      goto: jest.fn(),
      waitForSelector: jest.fn(),
      evaluate: mockEvaluate,
    };
    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    puppeteer.launch = jest.fn().mockResolvedValue(mockBrowser);

    const result = await buscarVideos('nodejs', 2);
    expect(puppeteer.launch).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });
});
