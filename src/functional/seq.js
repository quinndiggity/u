i_text(`(s
each (f seq exp (m seq
  isa (for seq.length (exp seq,$ $))
  iso (do 
    (s ak (keys seq))
    (for ak.length 
      (s key ak,$)
      (exp seq,key key)))
))
reduce (f ret seq exp
  (each seq (f val key
    (s ret (exp ret val key))
  ))
  ret
)
map (f seq exp (m seq
  isa (do
    (s ret [])
    (for seq.length (apend (exp seq,$ $) ret))
    ret
  )
  iso (do
    (s ret {} ak (keys seq))
    (for ak.length (s key ak,$ ret,key (exp seq,key key)))
    ret
  )
))
)`)