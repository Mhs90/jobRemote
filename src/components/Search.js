import {
    searchInputEl,
    errorTextEl,
    errorEl,
    numberEl,
    jobListSearchEl,
    searchFormEl,
    BASE_API_URL
} from '../common.js';

import errorRender from './Error.js'
import spinnerRender from './Spinner.js';
import { searchDetailsHtmlRender } from './searchDetails.js';

const submitHandler = event => {
    event.preventDefault();

    jobListSearchEl.innerHTML = '';
    //get input search text
    const searchText = searchInputEl.value;

    //Validation
    const forbiddenPattern = /<script>/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        errorRender("your search may not contain <script>");
        return;
    }

    searchInputEl.blur();

    spinnerRender("search");
    // fetch('data.json');
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response not exist");
            }

            return response.json();
        })
        .then(data => {
            // job items           
            const { jobItems } = data;
            numberEl.textContent = jobItems.length;

            spinnerRender("search");
            searchDetailsHtmlRender(jobItems);
        })
        .catch(error => {
            errorRender(error.message);
        });
};
searchFormEl.addEventListener('submit', submitHandler);