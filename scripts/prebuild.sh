TMP_DIR=$(pwd)

for file in $(grep -rl /app/vendor ${TMP_DIR}/vendor/vips/lib/pkgconfig)
do
  sed -i "s+/app/vendor+${TMP_DIR}/vendor+g" $file
done

node backup_data.js
