#!/bin/bash

set -e

[ -z "$1" ] && {
    echo "Specify a file"
    exit 1
}

[ ! -f "$1" ] && {
    echo "File $1 does not exist"
    exit 1
}

pandoc -f docx -t gfm --extract-media=./images -o output.md $1

