i_text(`(s 
js.onkeydown (fj e 
  (if (has e.key (as Alt Control Meta Shift)) return)
  (s abbr (event2abbr e))
  (log abbr)
)
abbrMap (os acms H cms A ams C acs M acm S)
event2abbr (f e
  (s abbr ')
  (if e.altKey (s+ abbr 'a))
  (if e.ctrlKey (s+ abbr 'c))
  (if e.metaKey (s+ abbr 'm))
  (if e.shiftKey (s+ abbr 's))
  (+ (prop abbr abbrMap) (if e.code.0='K (lowercase e.code.3) e.code)
)
)`)