import '@/scss/pages/my-services.scss'
// @ts-ignore
import Alpine from 'alpinejs'
import editor from '../../components/editor'

editor()

document.addEventListener('alpine:init', () => {
  const tokenEl = document.querySelector('input[name="_csrf"]') as HTMLInputElement

  if (!tokenEl) return

  Alpine.data('statusMenu', () => ({
    open: false,
    status: '',
    updateStatus(status: string) {
      fetch('/seller/update-status', {
        method: 'post',
        headers: {
          'Accept': 'Application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _csrf: tokenEl.value,
          status,
        }),
      })
        .then((response) => {
          if (response.ok) {
            this.status = 'status-' + status
          } else {
            console.error(response)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
  }))
})

Alpine.start()
