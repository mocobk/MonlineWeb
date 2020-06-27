import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: '复制成功！',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: '复制失败！',
    type: 'warning',
    duration: 1500
  })
}

export default function handleClipboard(text, event=document.body, success=clipboardSuccess, error=clipboardError) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    success()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    error()
    clipboard.destroy()
  })
  console.log('======clipboard.onClick', clipboard.onClick)
  clipboard.onClick(event)
}
