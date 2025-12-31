FROM rasa/rasa:3.6.20-full

USER root
RUN apt-get update && apt-get install -y \
    git \
    wget \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

USER 1001

EXPOSE 5005

CMD ["run", "-m", "/app/models", "--enable-api", "--cors", "*", "--debug" ,"--endpoints", "endpoints.yml", "--log-file", "out.log", "--debug"]


