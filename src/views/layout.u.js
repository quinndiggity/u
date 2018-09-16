i_text(`(s_obj views
center {d 'flex align-items 'center justify-content 'center h '100%}
row {d 'flex h '100% align-items 'center}
col {d 'flex flex-direction 'column}
fixed (f o child [{
  position 'fixed
  left (+ o.x*10 '%)
  top (+ o.y*10 '%)
  w (if o.w (+ o.w*10 '%) (+ child.w*10 '%))
  h (if o.h (+ o.h*10 '%) (+ child.h*10 '%))
  wx (if o.wx (+ o.wx*10 '%) (+ child.wx*10 '%))
  hx (if o.hx (+ o.hx*10 '%) (+ child.hx*10 '%))
} child])
grid (fv layout childs
  (pp {pos 'relative h '100%}
      (map layout (f o i (fixed o childs,i) ))
  )
)
)`)