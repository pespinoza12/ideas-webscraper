const puppeteer = require('puppeteer');

async function buscarVideos(keyword, maxVideos = 10) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/google-chrome-stable',
  });

  const page = await browser.newPage();

  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('#video-title');

  const videos = await page.evaluate((maxVideos) => {
    const videoElements = Array.from(document.querySelectorAll('#video-title')).slice(0, maxVideos);
    const videoContainers = Array.from(document.querySelectorAll('ytd-video-renderer')).slice(0, maxVideos);

    return videoContainers.map((container, i) => {
      const titleElement = container.querySelector('#video-title');
      const viewsElement = container.querySelector('span.inline-metadata-item.style-scope.ytd-video-meta-block');

      return {
        titulo: titleElement ? titleElement.innerText.trim() : 'N/A',
        link: titleElement ? titleElement.href : 'N/A',
        visualizacoes: viewsElement && viewsElement.innerText.includes('visualizações')
          ? viewsElement.innerText
          : 'N/A',
      };
    });
  }, maxVideos);

  await browser.close();
  return videos;
}

module.exports = { buscarVideos };
