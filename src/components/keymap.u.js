i_text(`(s_obj views
keymap (fv data
  (s ret [])
  (each data.v (f val key
    (push {i key c 'c9 ta 'right p 4 pr 8} ret)
    (push {i val c 'cf p 4} ret)
  ))
  [center (pp {
    d 'grid p 12
    grid-template-columns (+ 'repeat |p '12,minmax |p '2rem,auto |q |q)
  } ret)]
)

)`)