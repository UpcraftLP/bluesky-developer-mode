export function makeCopyButton(label: string, onClick: () => void): HTMLElement {
    const  button = document.createElement('div');
    button.innerText = label;
    button.addEventListener('click', () => {
        //TODO this is a hack, but it works
        // currently we assume that the previous button is the "Share" button, that handles closing the popup + displaying the "copied to clipboard message"
        const prev = button.parentElement?.parentElement?.previousElementSibling as HTMLElement;
        prev?.click();
        onClick();
    });
    return button;
}
