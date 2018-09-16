i_text(`(s
app []
focus 0
base 'preset
render_app (f
  (let childs (map app
          (f s i
            (let v (s.c.view s))
            (if s.layout (views.fixed s.layout v) v)
          )
       )
       wrap {b 'c0 c 'cf h '100% line-height 24}
  )
  (renderHTML (html.g_tree (pp wrap childs)))
)
js.onresize (fj (render_app))
add_app (f cname data id
  (s af (components,cname.init data)
     af.lastFocus focus
     af.c components,cname
     af.history []
     focus (ifu id app.length id)
     app,focus af
  )
)
set_app (f x
  (if (isi x) (rm_app x)
    (if (isa x) (add_app x.0 x.1 x.2))
    (let af app,focus)
    (if (iso x) (set af x))
    (if af.c.after (set af (af.c.after af)))
    (if af.history (push (assign af) af.history))
    (save_base af)
  )
  (if app,focus.imap (focus_textarea) (blur))
  (render_app)
)
rm_app (f id
  (s focus app,id.lastFocus)
  (remove app id)
)
)`)