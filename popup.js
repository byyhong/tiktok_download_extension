document.getElementById('downloadButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getVideoUrl
        }, (results) => {
            if (results && results[0] && results[0].result) {
                const videoUrl = results[0].result;
                chrome.downloads.download({
                    url: videoUrl,
                    filename: 'tiktok_video.mp4'
                });
            }
        });
    });
});

function getVideoUrl() {
    const videoElement = document.querySelector('video');
    return videoElement ? videoElement.src : null;
}