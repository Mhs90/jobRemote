import {
    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
    errorRender
} from '../common.js';

import spinnerRender from './Spinner.js';
import { jobDetailsHtmlRender } from './jobDetails.js';

const clickHandler = event => {
    event.preventDefault();
    const jobItemEL = event.target.closest('.job-item');

    document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    jobItemEL.classList.add('job-item--active');

    jobDetailsContentEl.innerHTML = '';
    spinnerRender("job");

    const jobId = jobItemEL.children[0].getAttribute('href');
    fetch(`${BASE_API_URL}/jobs/${jobId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response not exist");
                return;
            }
            return response.json();
        })
        .then(data => {
            const { jobItem } = data;

            spinnerRender("job");

            jobDetailsHtmlRender(jobItem);
        })
        .catch(error => {
            errorRender(error.message);
        });
};
jobListSearchEl.addEventListener('click', clickHandler);

