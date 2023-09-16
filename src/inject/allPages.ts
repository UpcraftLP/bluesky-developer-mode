import { resolveHandle } from "../lib/getDid";
import { makeCopyButton } from "../lib/copyButton";
import { injectMenuItem } from "../lib/menu";

let added = false;

window.addEventListener('click', () => {
    const anchor = document.querySelector('[aria-expanded="true"]')?.parentElement;
    if(anchor) {
        const postInfo = anchor.parentElement?.parentElement?.parentElement;
        const container = postInfo?.firstElementChild?.firstElementChild;
        if(container) {
            for(let i = 0; i < container.children.length; i++) {
                const child = container.children[i];
                if(child.tagName === 'A') {
                    const href = child.getAttribute('href');
                    if(href && href.startsWith('/profile/')) {
                        const result = href.match(/^\/profile\/(?<handle>[^\/]+)\/?.*$/);
                        const handle = result?.groups?.handle;
                        if(handle) {
                            if(!added) {
                                const button = makeCopyButton('Copy User DID', async () => {
                                    const did = await resolveHandle(handle);
                                    await navigator.clipboard.writeText(did);
                                    console.log(`Copied ${did} (${handle}) to clipboard`);
                                });
                                injectMenuItem(button, (menu, item) => {
                                    const element = menu.firstChild as HTMLElement;
                                    if(element.children.length >= 3) {
                                        element.children[2].after(item);
                                    }
                                    else {
                                        element.appendChild(item);
                                    }
                                });
                                added = true;
                            }
                            return;
                        }
                        
                    }
                }
            }
        }
    }
    
    added = false;
});
