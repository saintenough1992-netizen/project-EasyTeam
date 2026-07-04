export const backdrop = document.querySelector('[data-modal="success"]');
const closeBtn = document.querySelector('[data-modal-close]');

export function openSuccessModal() {
  if (!backdrop) return;
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscKeyPress);
}

export function closeSuccessModal() {
  if (!backdrop) return;
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeSuccessModal();
  }
}

if (backdrop && closeBtn) {
  closeBtn.addEventListener('click', closeSuccessModal);

  backdrop.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
      closeSuccessModal();
    }
  });
}
