FROM ubuntu:22.04

RUN apt update && apt install -y python3 python3-pip curl wget iputils-ping

RUN pip3 install -U pip

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN uv pip install --system --no-cache-dir -r /app/requirements.txt

COPY . /app

CMD ["python3", "main.py"]