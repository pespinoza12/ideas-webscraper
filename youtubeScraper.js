const puppeteer = require('puppeteer');

async function buscarVideos(keyword, maxVideos = 10) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('#video-title');

  const videos = await page.evaluate((maxVideos) => {
    const videoElements = Array.from(document.querySelectorAll('#video-title')).slice(0, maxVideos);
    const viewsElements = Array.from(document.querySelectorAll('#metadata-line span:nth-child(1)')).slice(0, maxVideos);
    const thumbnailElements = Array.from(document.querySelectorAll('ytd-thumbnail img')).slice(0, maxVideos);

    return videoElements.map((el, i) => ({
      titulo: el.innerText.trim(),
      link: el.href,
      visualizacoes: viewsElements[i] ? viewsElements[i].innerText.trim() : 'N/A',
      thumbnail: thumbnailElements[i] ? thumbnailElements[i].src : 'N/A'
    }));
  }, maxVideos);

  await browser.close();
  return videos;
}

module.exports = { buscarVideos };
