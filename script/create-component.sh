#!/bin/bash

NAME="$1"
FULLPATH=""

if [ -z "$2" ]
then
  FULLPATH="$PWD/src/components/$NAME"
else
  FULLPATH="$PWD/src/components/$2/$NAME"
fi

echo "path: $FULLPATH"

KEBAB_CASE=`echo "$1" | perl -ne 'print lc(join("-", split(/(?=[A-Z])/)))'`

echo "$KEBAB_CASE"

mkdir -p "$FULLPATH"

echo ".$KEBAB_CASE {
  position: relative;
}" > "$FULLPATH/$NAME.css"

echo "import './$NAME.css';

const $NAME = () => {
    console.log('This is $NAME component');
    return (
        <div className=\"$KEBAB_CASE\">
            <div>$NAME</div>
        </div>
    );
};

export default $NAME;" > "$FULLPATH/$NAME.tsx"
