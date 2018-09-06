i_text(`(s
prop (f key obj
  (if obj,key $ key)
)
last (f arr
  (g arr arr.length-1)
)
take (f keys seq
  (s ret (m seq isa [] iso {}))
  (each keys (f key (ifu seq,key 0
    (s ret,key seq,key)
    (delete seq key)
  )))
  ret
)

)`)