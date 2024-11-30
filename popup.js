document.getElementById('scrapeButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapePageData
    });
    
    document.getElementById('results').textContent = 
      JSON.stringify(results[0].result, null, 2);
  });
  
  // Content script function that will run on the target page
  function scrapePageData() {
    // Example scraping logic - customize based on your needs
    const data = {
      title: document.title,
      headings: Array.from(document.querySelectorAll('h1, h2')).map(h => h.textContent),
      links: Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.textContent,
        href: a.href
      })),
      meta: {
        description: document.querySelector('meta[name="description"]')?.content,
        keywords: document.querySelector('meta[name="keywords"]')?.content
      }
    };
    
    return data;
  }