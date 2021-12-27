TMP_DIR=$(pwd)

for file in $(grep -rl ${TMP_DIR}/vendor ${TMP_DIR}/vendor/vips/lib/pkgconfig)
do
  sed -i "s+${TMP_DIR}/vendor+/app/vendor+g" $file
done

node $TMP_DIR/scripts/backup_data.js
