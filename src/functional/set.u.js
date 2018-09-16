i_text(`(s
set (f obj changes
  (ifu changes obj
    (assign
      (map changes (f x key
        (let val obj,key)
        (ifu x val
          (if (isa x)
            (if x.1='all (x val)
              (if x.0.1='all (x.0 val x.1 x.2 x.3 x.4) x))
          x)
        )
      ))
    obj)
  )
)
inc (f n n+1)
dec (f n n-1)
add (f n x n+x)
sub (f n x n-x)
insert (f arr x n (splice arr n 0 x) )
remove (f arr n (splice arr n 1) )
)`)