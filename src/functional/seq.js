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
)`)