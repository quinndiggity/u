i_text(`(s components.indexP (components.Palette {
  name 'index
  init_list (f (map d,base (f val val.0)))
  confirm (f
    (rm_app focus)
    (let id matches,index.id)
    (if id+1
        ['outIndex id lastFocus]
      ['outIndex {name query last app,lastFocus} lastFocus]
    )
  )
}))`)