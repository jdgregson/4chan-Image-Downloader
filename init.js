/**
 * This file is part of 4chan Image Downloader, a helpful Chrome extension.
 * Authors: Jonathan Gregson.
 * License: GPLv3.
 * DL:https://chrome.google.com/webstore/detail/hahloifmmbcoaahbboegjcccniekbbib
 * Source: https://github.com/jdgregson/4chan-Image-Downloader
 */

// inject our main script
let script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", chrome.extension.getURL("downloader.js"));
document.head.appendChild(script);

// inject our download link
let link = document.createElement("a");
link.setAttribute("onclick", "downloadImages();");
link.setAttribute("style","position:fixed;bottom:5px;right:5px;cursor:pointer");
link.innerHTML = "Download all images";
document.body.appendChild(link);