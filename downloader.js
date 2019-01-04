/**
 * This file is part of 4chan Image Downloader, a helpful Chrome extension.
 * Authors: Jonathan Gregson.
 * License: GPLv3.
 * DL:https://chrome.google.com/webstore/detail/hahloifmmbcoaahbboegjcccniekbbib
 * Source: https://github.com/jdgregson/4chan-Image-Downloader
 */

/**
 * confirmDownload(count) will inform the user of the risks and ask them if they
 * would like to download count images.
 * @param  {Integer} count - number of images to be downloaded
 * @return {Boolean} - whether or not to start the download
 */
function confirmDownload(count) {
    let msg = 'Are you sure you want to download all images in this thread? ' +
        'There are ' + count + ' images to download.\n\n It may slow down your ' +
        'browser while the downloads are in progress.\n\n You may be prompted to ' +
        'allow the downloads at the top of the page a few times.';
    return confirm(msg);
}

/**
 * downloadImages(confirmed) will perform the download of the entire thread.
 * @param  {Boolean} confirmed - whether or not to treat this call as pre-
 *   confirmed and bypass the user's confirmation
 */
function wait(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    }
    while (d2 - d < ms);
}

function downloadImages(confirmed = false) {
    let images = document.getElementsByClassName("fileThumb");
    if (confirmed || confirmDownload(images.length)) {
        for (let i = 0; i < images.length; i++) {
            if (images[i].href) {
                // clone the image without 4chan X's event listeners
                let oldImg = images[i];
                let newImg = oldImg.cloneNode(true);
                oldImg.parentNode.replaceChild(newImg, oldImg);

                // set up and trigger the download of the image
                let name = newImg.href.split('/').slice(-1)[0];
                let link = newImg.href + '?4chan-image-downloader';
                newImg.href = link;
                newImg.setAttribute("download", name);
                wait(500);
                newImg.click()
                // put 4chan X's image back so the user can click on it again
                newImg.parentNode.replaceChild(oldImg, newImg);

            }
        }
    }
}

// if we're running on a new tab that we opened, try to close it every second
if (document.location.search.includes('4chan-image-downloader')) {
    var url = document.getElementsByTagName("img")[0].getAttribute("src").replace("?4chan-image-downloader", "");
    var filename = url.split('/').slice(-1)[0];
    var newAnchor = document.createElement("a");
    newAnchor.href = url;
    newAnchor.setAttribute("download", filename);
    newAnchor.click();
    self.setInterval(function() {
        close()
    }, 2000);
}
