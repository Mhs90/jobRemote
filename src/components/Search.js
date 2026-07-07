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
    try {
        const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
        if (!response.ok) {
            throw new Error("Response not exist")
        }
        const data = await response.json();
        const { jobItems } = data;
        numberEl.textContent = jobItems.length;

        spinnerRender("search");
        searchDetailsHtmlRender(jobItems);
    } catch (err) {
        spinnerRender("job");
        errorRender(err)
    }
};
searchFormEl.addEventListener('submit', submitHandler);