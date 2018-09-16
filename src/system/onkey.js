document.addEventListener('keydown', e => {
  if (e.key === "`") {
    let b = document.body,
        f = b.mozRequestFullScreen || b.webkitRequestFullscreen || b.requestFullscreen
    f.bind(b)()
  }
  if (e.key == 'Tab') e.preventDefault()
})

hiddenWrap = document.getElementById('hidden')
document.getElementById('textarea').addEventListener('keydown', e => {
  let cursor = document.getElementById('cursor')
  if (cursor) {
    let pos = cursor.getBoundingClientRect()
    hiddenWrap.style.left = pos.left + 'px'
    hiddenWrap.style.top = pos.top + 'px'
  }
})

document.addEventListener('paste', e => {
  clip = e.clipboardData
  text = clip.getData('text/plain')
  paste_text = envRoot.app[envRoot.focus].c.paste_text
  if (paste_text) paste_text(text)
})