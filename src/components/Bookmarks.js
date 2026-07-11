import {
    state,
    bookmarksBtnEl,
    jobListBookmarksEl,
    jobDetailsEl
} from "../common.js";
import renderjobList from "./JobList.js";

const mouseEnterHandler = () => {
    bookmarksBtnEl.classList.add("bookmarks-btn--active");
    jobListBookmarksEl.classList.add("job-list--visible");
}

const mouseLeaveHandler = () =>{
    bookmarksBtnEl.classList.remove("bookmarks-btn--active");
    jobListBookmarksEl.classList.remove("job-list--visible");
}

bookmarksBtnEl.addEventListener("mouseenter",mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave",mouseLeaveHandler);