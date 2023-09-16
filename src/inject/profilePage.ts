import { makeCopyButton } from "../lib/copyButton";
import { resolveHandle } from "../lib/getDid";
import { injectMenuItem } from '../lib/menu';

const result = window.location.pathname.match(/^\/profile\/(?<handle>[^\/]+)\/?$/);
if (result?.groups?.handle) {

    const handle = result.groups.handle;
    let added = false;

    window.addEventListener('click', async () => {
        const child = document.querySelector('[data-testid="profileHeaderDropdownBtn"] > [aria-expanded="true"]');
        if (child) {
            if (!added) {
                const didPromise = resolveHandle(handle);
                const button = makeCopyButton('Copy User DID', async () => {
                    const did = await didPromise;
                    await navigator.clipboard.writeText(did);
                    console.log(`Copied ${did} (${handle}) to clipboard`);
                });
                injectMenuItem(button, (menu, item) => {
                    const element = menu.firstChild as HTMLElement;
                    element.appendChild(item);
                });
                added = true;
            }
        }
        else {
            added = false;
        }
    });
}
