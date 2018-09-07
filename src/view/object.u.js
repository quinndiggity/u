i_text(`(s_obj v
keymap (f data 
  (s ret [])
  (each data.v (f val key
    (apend {i key c 'c9 ta 'right p 4 pr 8} ret)
    (apend {i val c 'cf p 4} ret)
  ))
  [v.center (ppend {
    d 'grid p 12 
    grid-template-columns (+ 'repeat |p '12,minmax |p '2rem,auto |q |q)
  } ret)]
)
center {display 'flex align-items 'center justify-content 'center h '100%}

)`)