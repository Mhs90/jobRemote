import {
    searchInputEl,
    numberEl,
    jobListSearchEl,
    searchFormEl,
    BASE_API_URL
} from '../common.js';

import errorRender from './Error.js'
import spinnerRender from './Spinner.js';
import { searchDetailsHtmlRender } from './searchDetails.js';

const submitHandler = async event => {
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

    const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await response.json();
    const { jobItems } = data;
    numberEl.textContent = jobItems.length;

    spinnerRender("search");
    searchDetailsHtmlRender(jobItems);
};
searchFormEl.addEventListener('submit', submitHandler);