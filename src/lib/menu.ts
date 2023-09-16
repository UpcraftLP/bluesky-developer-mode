export function injectMenuItem(item: HTMLElement, insertFn: (menu: HTMLElement, item: HTMLElement) => void) {
    const popup = document.querySelector('[data-radix-popper-content-wrapper]');
    if (popup) {
        const menu = document.querySelector('[data-radix-menu-content]') as HTMLElement;
        if(!menu) {
            console.error('Unable to inject menu item: menu not found!');
            return;
        }

        const menuItem = document.createElement('div');
        menuItem.role = 'menuitem';
        menuItem.tabIndex = -1;
        menuItem.ariaOrientation = 'vertical';
        menuItem.setAttribute('data-radix-collection-item', '');
        menuItem.style.outlineWidth = '0px';

        const inner = document.createElement('div');
        inner.className = 'css-175oi2r r-1awozwy r-1xfd6ze r-k73bfn r-1loqt21 r-18u37iz r-1wtj0ep r-11f147o r-3o4zer';
        menuItem.appendChild(inner);

        item.classList.add('css-146c3p1', 'r-1i10wst', 'r-lrvibr');
        item.style.color = 'rgb(0, 0, 0)';
        inner.appendChild(item);

        const icon = document.createElement('div');
        icon.className = 'css-175oi2r';
        icon.innerHTML = `
        <svg viewBox="0 0 512 512" height="20" width="20" tabindex="-1">
            <path fill="#000000"
                d="M80 96v16c0 17.7 14.3 32 32 32h60.8c16.6-28.7 47.6-48 83.2-48h62c-7.1-27.6-32.2-48-62-48H215.4C211.6 20.9 188.2 0 160 0s-51.6 20.9-55.4 48H64C28.7 48 0 76.7 0 112V384c0 35.3 28.7 64 64 64h96V400H64c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H80zm64-40a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM256 464c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H384v48c0 17.7 14.3 32 32 32h48V448c0 8.8-7.2 16-16 16H256zm192 48c35.3 0 64-28.7 64-64V227.9c0-12.7-5.1-24.9-14.1-33.9l-51.9-51.9c-9-9-21.2-14.1-33.9-14.1H256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H448z">
            </path>
        </svg>
        `;
        inner.appendChild(icon);
        menuItem.addEventListener('focus', () => {
            menuItem.dataset.highlighted = "";
            inner.style.backgroundColor = 'rgb(0, 0, 0, 0.07)';
        });
        menuItem.addEventListener('mouseenter', () => {
            menuItem.dataset.highlighted = "";
            inner.style.backgroundColor = 'rgb(0, 0, 0, 0.07)';
        });
        menuItem.addEventListener('blur', () => {
            menuItem.dataset.highlighted = undefined;
            inner.style.backgroundColor = '';
        });
        menuItem.addEventListener('mouseleave', () => {
            menuItem.dataset.highlighted = undefined;
            inner.style.backgroundColor = '';
        });

        insertFn(menu, menuItem);
    }
}

export function closeMenu() {
    document.querySelectorAll('[data-radix-focus-guard]').forEach(e => e.remove());
    document.querySelector('[data-radix-popper-content-wrapper]')?.remove();
    document.querySelectorAll('[data-aria-hidden]').forEach(e => {
        e.ariaHidden = null;
        const element = e as HTMLElement;
        element.dataset['aria-hidden'] = undefined;
    })
}
