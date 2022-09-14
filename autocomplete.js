var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchBox = document.getElementById('searchBox');
const suggestionBox = document.getElementById('suggestionBox');
const debounceTime = (fn, delay = 300) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        let that = this;
        timer = setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    };
};
const throttleTime = (fn, delay = 300) => {
    let isCalled = false;
    return function (...args) {
        if (!isCalled) {
            isCalled = true;
            const that = this;
            fn.apply(that, args);
            setTimeout(() => {
                isCalled = false;
            }, delay);
        }
    };
};
const getSuggestions = (keyword) => {
    return fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then((comments) => comments
        .map((comment) => comment.email).
        filter((email) => email.toLocaleLowerCase().slice(0, keyword.length) === keyword.toLocaleLowerCase()));
};
function showSuggestions() {
    if (suggestionBox) {
        suggestionBox.classList.add('show');
        suggestionBox.classList.remove('hide');
    }
}
function resetSuggestions() {
    if (suggestionBox) {
        suggestionBox.classList.add('hide');
        suggestionBox.classList.remove('show');
        suggestionBox.innerHTML = "";
    }
}
const renderSuggestions = (suggestions) => {
    const fragment = new DocumentFragment();
    suggestions.forEach((suggestion) => {
        const option = document.createElement('div');
        option.textContent = suggestion;
        option.dataset.key = suggestion;
        option.classList.add('option');
        fragment.append(option);
    });
    if (suggestionBox) {
        showSuggestions();
        suggestionBox.innerHTML = "";
        suggestionBox.append(fragment);
    }
};
const handleSearch = (value) => __awaiter(this, void 0, void 0, function* () {
    try {
        const suggestions = yield getSuggestions(value);
        console.log(suggestions);
        renderSuggestions(suggestions);
    }
    catch (error) {
        console.log(error);
    }
});
const handleInput = (event) => {
    console.log(event);
    if (event instanceof Event) {
        const targetElement = event.target;
        const inputValue = targetElement.value;
        console.log(inputValue);
        if (inputValue) {
            handleSearch(inputValue);
        }
        else {
            resetSuggestions();
        }
    }
};
const handleSelect = (event) => {
    const target = event.target;
    const { key } = target.dataset;
    if (key) {
        searchBox.value = key;
        resetSuggestions();
    }
};
(() => {
    if (searchBox && suggestionBox) {
        searchBox.addEventListener('input', throttleTime(handleInput));
        suggestionBox.addEventListener('click', handleSelect);
    }
})();
