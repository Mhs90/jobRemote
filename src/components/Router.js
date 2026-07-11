import {
    BASE_API_URL,
    jobDetailsContentEl,
    getData,
    state
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetailsHtml from "./JobDetails.js";
import renderError from "./Error.js";

const loadHandler = async () => {
    const id = window.location.hash.substring(1);
    if (id) {
        try {
            jobDetailsContentEl.innerHTML = '';
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
            const { jobItem } = data;
            renderSpinner('joblist');
            renderJobDetailsHtml(jobItem);
            state.activeJobItem = jobItem;
            renderSpinner('joblist');
        } catch (error) {
            renderSpinner('joblist');
            renderError(error.userError);
        }
    }
}

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);