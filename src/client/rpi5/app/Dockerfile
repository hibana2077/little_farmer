FROM ubuntu:24.04

RUN apt update && apt install -y python3 python3-pip curl wget iputils-ping

ADD --chmod=755 https://astral.sh/uv/install.sh /install.sh
RUN /install.sh && rm /install.sh

RUN pip3 install -U pip

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN /root/.cargo/bin/uv pip install --system --no-cache -r requirements.txt

COPY . /app

CMD ["python3", "main.py"]