CONTAINER_NAME      := omnissa_blog
IMAGE_NAME          := $(CONTAINER_NAME)__img
TOP_DIR             := $(abspath $(CURDIR)/..)


# ======================================================================
# Build & Run the Example Container
# ======================================================================
.PHONY: build run

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -it --rm -p 3000:3000 \
		-v $(TOP_DIR):/work \
		--name $(CONTAINER_NAME) \
		$(IMAGE_NAME)

# ======================================================================
# Docker helpers
# ======================================================================
.PHONY: docker-rmi docker-ps

docker-rmi:
	docker rmi $(IMAGE_NAME):latest || true

docker-ps:
	docker ps


