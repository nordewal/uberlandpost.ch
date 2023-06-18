#!/bin/fish

for f in (find src/content/blog/ -iname "*jpg")
  if test (identify -format '%[EXIF:orientation]' $f) -eq 1
    if test (identify -format '%[height]' $f) -le 2500 && test (identify -format '%[width]' $f) -le 2500
      continue
    end
  end
  mogrify -auto-orient -resize 2500x2500\> $f
end
