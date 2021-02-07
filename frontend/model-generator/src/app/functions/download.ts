
export function download(blob: any, filename: string) {
  let url = window.URL.createObjectURL(blob);
  let element = document.createElement('a');
  document.body.appendChild(element);
  element.setAttribute('style', 'display: none');
  element.href = url;
  element.download = filename;
  element.click();
  window.URL.revokeObjectURL(url);
  element.remove();
}
