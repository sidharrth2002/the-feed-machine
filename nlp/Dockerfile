FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
ENV PORT 8080
ENV APP_MODULE app.api:app
ENV LOG_LEVEL debug
ENV WEB_CONCURRENCY 2

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

RUN spacy download This must be one of spaCy's default models. See https://spacy.io/usage for a supported list.

COPY ./app /app/app
