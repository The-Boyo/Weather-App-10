
export function renderDateFooter() {
    const markup = `
    <div class="bottom">
            <p>&copy;${new Date().getFullYear()}</p>
        </div>
    `
    document.querySelector('.footer').insertAdjacentHTML('afterbegin', markup);
}

export function clearFooter() {
    document.querySelector('.footer').innerHTML = '';
}