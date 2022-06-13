import Modal from './Modal'
import { createVNode, render } from 'vue'

Modal.install = (app, options) => {
  app.component(Modal.name, Modal)
  app.config.globalProperties.$modal = {
    show({
      title = '',
      message = '',
      showMask = false,
      showCancel = false,
      onEnter,
      onClose,
    }) {
      const container = document.createElement('div')
      const vnode = createVNode(Modal)
      render(vnode, container)

      const instance = vnode.component
      document.body.appendChild(container)

      const { _hub, props } = instance

      const _closeModal = () => {
        if (container.parentNode) {
          props.modelValue = false
          container.parentNode.removeChild(container)
        }
      }

      Object.assign(props, {
        modelValue: true,
        title,
        message,
        isShow: true,
        showCancel,
        showMask,
      })
      Object.assign(_hub, {
        async 'on-enter'() {
          if (onEnter) {
            const fn = onEnter()
            if (fn && fn.then) {
              try {
                await fn
                _closeModal()
              } catch (e) {}
            } else {
              _closeModal()
            }
          } else {
            _closeModal()
          }
        },
        'on-close'() {
          onClose && onClose()
          _closeModal()
        },
      })
    },
  }
}

export { Modal }
