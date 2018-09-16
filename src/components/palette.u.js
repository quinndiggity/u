i_text(`(s components.Palette (f config {
  confirm config.confirm
  init (f str
    (let list (config.init_list))
    {
      query str
      index 0
      caret 0
      list list
      matches (fuzzy_filter str list)
      imap 1
    }
  )
  after (f
    (let m (fuzzy_filter query list))
    {matches (if m.length m [{name (str Create: ,config.name ,query) noMatch true}])}
  )
  view (fv
    (let iw js.innerWidth ih js.innerHeight
         p {pos 'fixed b 'c0 bs 'bs bw 'bw bc 'cf overflow 'hidden}
    )
    (if iw>500
      (s p.w 500 p.left (÷ iw-p.w 2))
      (s p.w iw-2 p.left 1)
    )
    (if ih>500
      (let p.h ih*6÷10 p.top (÷ ih-p.h 2) hx ih*5÷10)
      (let p.h ih-20 p.top 10 hx ih-100)
    )
    [p
      [ {p 12 h 32 border 0 border-bottom 1 bs 'bs bc 'cf}
        (input query caret) ]
      (pp {p 12 hx hx c overflow 'scroll}
          (select index matches) )
    ]
  )
  input (f v {
    index 0
    caret [add v.length]
    query (splice query caret 0 v)
  })
  rm_left (f
    (if caret {
      query (remove query caret-1)
      caret dec
      index 0
    })
  )
  rm_right (f
    (if caret<query.length {
      query (remove query caret)
      index 0
    })
  )
  cursor_left (f
    (if caret {caret dec})
  )
  cursor_right (f
    (if caret<query.length {caret inc})
  )
  cursor_up (f
    (if index { index dec })
  )
  cursor_down (f
    (if index<matches.length-1 { index inc })
  )
  cancel (f focus)
  imap (os
    Enter confirm
    Escape cancel
  )
}))`)