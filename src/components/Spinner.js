import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../common.js';

const spinnerRender = whichSpinner => {
    const spinner = whichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinner.classList.toggle("spinner--visible");
};

export default spinnerRender;