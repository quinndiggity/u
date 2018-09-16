i_text(`(s components.outIndex {
  init (f x
    (let db d,base)
    (if (isi x) {
        id x
        dn db,x
        index 0
        caret db,x.0.length
        imap 0
      }
      (if x.id (let id x.id)
        (let id db.length)
        (push [x.name '] db)
      )
      {id id dn db,id index 1 caret 0 imap 0 last (assign x.last)}
    )
  )
  view (fv
    (l dn index imap)
    [center 'scroll
      (pp {}
        (map dn (f line i
          (if i=0 [{transform (+ 'translateX |p '-16px |q)}
                   (ifn index (if imap (input line caret)
                                       [{c 'cc} (text line)])
                              (text line) )]
            (if (isi line) (if i=index (if imap
                                           [{c 'cc} (input d,base,line.0 caret)]
                                         [{c 'cc} (text (str ,d,base,line.0 →))] )
                           (text (str ,d,base,line.0 →)) )
                (if i=index (if imap (input line caret)
                                     [{c 'cc} (text line)])
                            (text line) )
            )
          )
        ))
      )
    ]
  )
  input (f v
    (s dn,index (splice dn,index caret 0 v))
    {caret [add v.length]}
  )
  rm_index (f
    (ifd index
      (let i index-1)
      {dn [remove index] index i caret dn,i.length}
    )
  )
  rm_left (f
    (let line dn,index)
    (ifd (isi line)
      (let i index-1)
      {dn [remove index] index i caret dn,i.length}
      return
    )
    (ifn caret (ifd (& index line.length=0)
        (let i index-1)
        {dn [remove index] index i caret dn,i.length}
      )
      (s dn,index (remove line caret-1))
      {caret dec}
    )
  )
  rm_right (f
    (let c caret i index)
    (if c<dn,i.length (s dn,i (remove dn,i c)))
  )
  cursor_left (f
    (if caret {caret dec})
  )
  cursor_right (f
    (let i dn,index)
    (if (isi i) ['outIndex {id i last app,focus} focus]
      (if caret<i.length {caret inc})
    )
  )
  cursor_up (f
    (let prev dn/index-1)
    (if index {
      index dec
      caret (if prev.length<caret prev.length)
    })
  )
  cursor_down (f
    (let next dn/index+1)
    (ifu next _ {
      index inc
      caret (if next.length<caret next.length)
    })
  )
  new_line (f
    (let x dn,index)
    (if (isi x) {index inc caret 0 dn [insert ' index+1]}
      (let old dn,index new old^caret)
      (s dn,index (slice old 0 caret))
      {index inc caret 0 dn [insert new index+1]}
    )
  )
  prev_space (f
    (let i (indexFo |s dn,index caret-1) )
    {caret (if i+1 i 0)}
  )
  next_space (f
    (let i (indexOf |s dn,index caret+1))
    {caret (if i+1 i dn,index.length)}
  )
  line_start (f {caret 0} )
  line_end (f {caret dn,index.length} )
  line_top (f {caret dn.0.length index 0} )
  line_bottom (f
    (let i dn.length-1)
    {caret dn,i.length index i}
  )
  rm_line_start (f
    (s dn,index dn,index^caret)
    {caret dn,index.length-1}
  )
  rm_prev_space (f
    (let i (indexFo |s dn,index caret-1) )
    (ifn i+1 (s i 0))
    (s dn,index (splice dn,index i caret '))
    {caret i}
  )
  paste_text (fj text
    (let texts (split text |n)
         c components.outIndex
         af app,focus)
    (each texts (f text i
      (set_app (c.input text af))
      (ifn texts=i (set_app (c.new_item af)))
    ))
  )
  go_child (f
    (let line dn,index af app,focus)
    (ifn line&index return)
    (if (isi line) ['outIndex {id line last af} focus]
      (s dn,index d,base.length)
      ['outIndex {name line last af} focus]
    )
  )
  go_last (f
    (if (isa last) return)
    last
  )
  undo (f
    (if history.length (pop history))
  )
})`)