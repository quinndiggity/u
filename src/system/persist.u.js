i_text(`(s
connected js.location.host='localhost:3434
save_base (f state
  (ifd base≠'preset
    (let dn state.dn)
    (if dn (if (is_root_dir base)
               (if connected (save_dir base d,base))
             (save_storage base d,base)
    ))
  )
)
save_dir (f dirname db
  (POST ['save_dir dirname db] (fj res (l res)))
)
save_storage (f key data
  (s js.localStorage,key (js.JSON.stringify data))
)
load_storage (f key
  (JSONparse js.localStorage,key)
)
load_dir (f dirname
  (POST ['load_dir dirname] (fj data
    (if (isa data) (s d,dirname data))
  ))
)
load_base (f base
  (ifd base≠'preset
    (if (is_root_dir base)
        (if connected (load_dir base))
      (let db (load_storage base))
      (if (isa db) (s d,base db))
    )
  )
)
load_bases (f
  (let bases (load_storage '_bases))
  (each bases load_base)
)
)`)