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
all_keys (f obj ret parentKey
  (ifu ret (s ret []))
  (each obj (f val key
    (s fullKey (if parentKey (+ parentKey '. key) key ))
    (if (iso val)
      (all_keys val ret fullKey)
      (push fullKey ret)
    )
  ))
  ret
)
)`)