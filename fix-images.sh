#!/bin/fish

# rename all file extensions to lower case (JPG -> jpg)
find . -iname '*.JPG' -exec sh -c '
  a=$(echo "$0" | sed -r "s/([^.]*)\$/\L\1/");
  [ "$a" != "$0" ] && mv "$0" "$a" ' {} \;

for f in (find src/content/blog/ -iname "*jpg")
  if identify -format '%[EXIF:orientation]' $f 2>&1 |grep -Eq "(^1|unknown image property)"
    if test (identify -format '%[height]' $f) -le 2000 && test (identify -format '%[width]' $f) -le 2000
      continue
    end
  end
  mogrify -auto-orient -resize 2000x2000\> $f &
end
