i_text(`(s
each (f seq exp (m seq
  iso (do
    (s ak (keys seq))
    (for ak.length
      (s key ak,$)
      (exp seq,key key)))
  true (for seq.length (exp seq,$ $))
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
    (for seq.length (push (exp seq,$ $) ret))
    ret
  )
  iso (do
    (s ret {} ak (keys seq))
    (for ak.length (s key ak,$ ret,key (exp seq,key key)))
    ret
  )
))
filter (f seq exp (m seq
  isa
  (reduce [] seq (f ret val key
    (if (exp val key) (push val ret))
    ret
  ))
  iso
  (reduce {} seq (f ret val key
    (if (exp val key) (s ret,key val))
    ret
  ))
))
fuzzy_filter (f queryText arr
  (ifn queryText (map arr (f v k {id k name v}))
    (let ret [])
    (each arr (f val key
      (s index 0)
      (for queryText.length
        (s index (has queryText,$ val index))
        (ifn index return)
      )
      (if index (push {name val id key} ret))
    ))
    ret
  )
)
)`)