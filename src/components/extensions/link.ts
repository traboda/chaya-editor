import { Hyperlink, Tooltip } from '@docs.plus/extension-hyperlink';
import { find } from 'linkifyjs';

const previewHyperlinkModal = (options: any) => {
  const href = options.link.href;

  const preview = document.createElement('div');
  preview.classList.add('flex', 'items-center', 'text-blue-500', 'hover:underline', 'w-2/3', 'px-2');

  const hrefTitle = document.createElement('a');
  hrefTitle.setAttribute('target', '_blank');
  hrefTitle.setAttribute('rel', 'noreferrer');
  hrefTitle.setAttribute('href', href);
  hrefTitle.classList.add('truncate', 'font-medium');
  hrefTitle.innerText = href;
  preview.append(hrefTitle);

  const actions = document.createElement('div');
  actions.classList.add('flex', 'justify-end', 'space-x-2', 'w-1/3', 'px-2');

  const actionButtonClasses = ['px-2', 'border', 'border-gray-200', 'rounded', 'py-1', 'hover:bg-gray-100'];

  const editButton = document.createElement('button');
  editButton.classList.add('ri-pencil-line', ...actionButtonClasses);
  editButton.addEventListener('click', () => {
    options.tippy.hide();
    return options.editor.chain().focus().setHyperlink({ href }).run();
  });

  const copyButton = document.createElement('button');
  copyButton.classList.add('ri-file-copy-line', ...actionButtonClasses);
  copyButton.addEventListener('click', () => {
    options.tippy.hide();
    navigator.clipboard.writeText(href);
  });

  const removeButton = document.createElement('button');
  removeButton.classList.add('ri-link-unlink', ...actionButtonClasses, 'text-red-500');
  removeButton.addEventListener('click', () => {
    options.tippy.hide();
    return options.editor.chain().focus().unsetHyperlink().run();
  });

  actions.append(editButton, copyButton, removeButton);

  const hyperlinkModal = document.createElement('div');
  hyperlinkModal.classList.add('bg-background', 'p-2', 'border', 'z-[7500]', 'rounded', 'shadow', 'flex', 'items-center', 'gap-x-2');
  hyperlinkModal.append(preview, actions);

  return hyperlinkModal;

};


const setHyperlinkModal = (options: any) => {
  const tooltip: Tooltip = new options.Tooltip(options);

  const { tippyModal } = tooltip.init();

  const form = document.createElement('form');

  const inputsWrapper = document.createElement('div');
  inputsWrapper.classList.add('hyperlink-set-modal__inputs-wrapper');
  const input = document.createElement('input');
  input.classList.add('w-full', 'border', 'border-gray-200', 'rounded', 'px-2', 'py-1', 'outline-none');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Type or paste a link. eg: https://example.com');
  inputsWrapper.append(input);

  form.append(inputsWrapper);

  const hyperlinkModal = document.createElement('div');
  hyperlinkModal.classList.add('bg-white', 'p-2', 'border', 'z-[7500]', 'rounded', 'shadow', 'w-[400px]', 'max-w-full');
  hyperlinkModal.append(form);

  tippyModal.innerHTML = '';
  tippyModal.append(hyperlinkModal);
  tooltip.update(options.editor.view);

  // make sure
  setTimeout(() => input.focus(), 100);

  // event listenr for submit button
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = input.value;

    if (!url) return;
    const sanitizeURL = find(url)
      .filter((link) => link.isLink)
      .filter((link) => {
        if (options.validate) {
          return options.validate(link.value);
        }
        return true;
      })
      .at(0);

    if (!sanitizeURL?.href) return;

    tooltip?.hide();

    return options.editor
      .chain()
      .setMark(options.extentionName, { href: sanitizeURL.href })
      .setMeta('preventautohyperlink', true)
      .run();
  });

};


export default Hyperlink.configure({
  hyperlinkOnPaste: false,
  openOnClick: true,
  modals: {
    previewHyperlink: previewHyperlinkModal,
    setHyperlink: setHyperlinkModal,
  },
});
