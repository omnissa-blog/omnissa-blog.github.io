# Usage

## Build the container

```
make build
```

## Run the container

```
make run
```

## In the container...

`make run` drops you at a prompt inside the container:

```
[root@48304fcd6580 work]#
```

Now you can run the `./docker/entrypoint.sh` script to start the app.

Note: `pandoc` is also available if you want to convert WORD to markdown.


