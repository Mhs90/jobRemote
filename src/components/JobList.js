import {
    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
} from '../common.js';

import errorRender from './Error.js';
import spinnerRender from './Spinner.js';
import { jobDetailsHtmlRender } from './jobDetails.js';

const clickHandler = async event => {
    event.preventDefault();
    const jobItemEL = event.target.closest('.job-item');

    document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    jobItemEL.classList.add('job-item--active');

    jobDetailsContentEl.innerHTML = '';
    spinnerRender("job");
    try {
        const jobId = jobItemEL.children[0].getAttribute('href');
        const response = await fetch(`${BASE_API_URL}/jobs/${jobId}`);
        if (!response.ok) {
            throw new Error("Response not exist")
        }
        const data = await response.json();
        const { jobItem } = data;

        spinnerRender("job");

        jobDetailsHtmlRender(jobItem);
    } catch (err) {
        spinnerRender("job");
        errorRender(err)
    }
};
jobListSearchEl.addEventListener('click', clickHandler);

