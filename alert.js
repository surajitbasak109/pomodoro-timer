export default function alert(msg) {
  let state = {
    msg: 'Default alert',
    template: `<dialog class="dialog" id="alert-dialog">
      <header class="dialog-header">
        <h4 class="dialog-title">Alert</h4>
        <button class="dialog-close">&times;</button>
      </header>
      <section class="dialog-body">{{_MESSAGE_}}</section>
    </dialog>`
  }
  state.msg = msg;
  render();

  function render() {
    state.template = state.template.replace(`{{_MESSAGE_}}`, state.msg);
    document.body.insertAdjacentHTML('beforeend', state.template);
    document.getElementById('alert-dialog').showModal();
    document.querySelector('.dialog-close').addEventListener('click', removeDialog);
  }

  function removeDialog() {
    const dialogElm = document.getElementById('alert-dialog');
    if (dialogElm) dialogElm.remove();
  }
}
